import { trpc } from '../utils/trpc';

export default function Orders() {
  const { data } = trpc.useQuery(['product-bought']);

  const utils = trpc.useContext();

  const deliverProduct = trpc.useMutation('product-deliver-order', {
    async onSuccess() {
      // refetches posts after a post is added
      await utils.invalidateQueries(['product-bought']);
    },
  });

  const handleDeliver = ({
    userId,
    productId,
  }: {
    userId: number;
    productId: number;
  }) => {
    const input = { userId, productId };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    deliverProduct.mutateAsync(input);
  };

  return (
    <div className="mx-auto w-7/12 border my-4 p-4">
      <h2 className="font-bold text-center">Orders</h2>

      <ul className="my-2">
        {data?.products?.map(({ id, userId, productId, isBought }) => (
          <>
            <hr />
            <li key={id} className="my-4">
              <div>
                <p>User: {userId}</p>
                <p>Product: {productId}</p>
              </div>
              {isBought ? (
                <span className="text-red-400">Delivered</span>
              ) : (
                <button
                  className="border px-4 my-2 bg-gray-200 hover:bg-slate-300"
                  onClick={() =>
                    handleDeliver({
                      userId,
                      productId,
                    })
                  }
                >
                  Deliver
                </button>
              )}
            </li>
            <hr />
          </>
        ))}
      </ul>
    </div>
  );
}
