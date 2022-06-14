import { trpc } from '../utils/trpc';

export default function Orders() {
  const { data } = trpc.useQuery(['product-bought']);

  return (
    <div className="mx-auto w-7/12 border my-4 p-4">
      <h2 className="font-bold text-center">Orders</h2>

      <ul className="my-2">
        {data?.products?.map(({ id, userId, productId }) => (
          <>
            <li key={id}>
              <p>User: {userId}</p>
              <p>Product: {productId}</p>
            </li>
            <hr />
          </>
        ))}
      </ul>
    </div>
  );
}
