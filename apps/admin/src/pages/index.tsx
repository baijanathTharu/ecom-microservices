import React from 'react';
import { trpc } from '../utils/trpc';

const UserComponent: React.FC = () => {
  const { data } = trpc.useQuery(['product-all']);
  const utils = trpc.useContext();

  const addProduct = trpc.useMutation('product-add', {
    async onSuccess() {
      // refetches posts after a post is added
      await utils.invalidateQueries(['product-all']);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;

    const input = { name };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await addProduct.mutateAsync(input);
  };

  return (
    <div className="mx-auto w-1/2 my-8">
      <div className="my-4">
        <h2 className="text-2xl text-center my-2">Products List</h2>
        <ul className="border p-4">
          {data?.products.map((product) => (
            <li key={product.id}>{product.name}</li>
          ))}
        </ul>
      </div>
      <hr />
      <div className="border p-4">
        <h3>Add new product</h3>
        <form onSubmit={handleSubmit}>
          <div className="py-4">
            <label>Name:</label>
            <input
              className="ml-2 border px-1 py-2"
              type="text"
              name="name"
              disabled={addProduct.isLoading}
            />
          </div>
          <div className="py-4">
            <button
              className="border px-4 py-2 bg-slate-200"
              type="submit"
              disabled={addProduct.isLoading}
            >
              {addProduct.isLoading ? 'Loading...' : 'Add'}
            </button>
            {addProduct.isError && addProduct.error.message}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserComponent;
