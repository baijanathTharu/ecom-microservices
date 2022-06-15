import React, { useEffect } from 'react';
import { trpc } from '../utils/trpc';

const UserComponent: React.FC = () => {
  const [userId, setUserId] = React.useState<number | null>(null);

  useEffect(() => {
    const user = localStorage.getItem('user');

    if (user) {
      const parsed = JSON.parse(user);
      setUserId(parsed.id);
    }
  }, []);

  const { data } = trpc.useQuery([
    'product-all',
    {
      userId: userId as number,
    },
  ]);

  const utils = trpc.useContext();

  const createOrder = trpc.useMutation('product-place-order', {
    async onSuccess() {
      // refetches posts after a post is added
      await utils.invalidateQueries(['product-all']);
    },
    async onError(error) {
      console.log('error', error);
    },
  });

  const handleOrder = ({
    productId,
    userId,
  }: {
    productId: number;
    userId: number;
  }) => {
    const input = { productId, userId };
    createOrder.mutateAsync(input);
  };

  return (
    <div className="mx-auto w-1/2">
      <div>
        <h2 className="my-4 text-center font-bold text-2xl">Shop page</h2>
      </div>
      <div className="text-red-400 text-xs my-2 text-center">
        {createOrder.isError && createOrder.error.message}
      </div>
      <ul className="p-4 border">
        {data?.map((product) => (
          <li className="py-2 flex justify-between" key={product.id}>
            <span className="mx-2">{product.name}</span>
            {product.isOrdered && product.isBought ? (
              <span className="text-green-400">Bought</span>
            ) : product.isOrdered ? (
              <span className="text-red-400">Ordered</span>
            ) : (
              <>
                <button
                  className="py-1 px-4 border bg-gray-300 hover:bg-gray-200"
                  onClick={() =>
                    handleOrder({
                      userId: userId as number,
                      productId: product.id,
                    })
                  }
                  disabled={createOrder.isLoading}
                >
                  Order
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserComponent;
