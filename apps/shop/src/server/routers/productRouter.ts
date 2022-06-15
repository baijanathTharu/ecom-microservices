import axios from 'axios';
import z from 'zod';
import { createRouter } from '../utils/createRouter';

export const productRouter = createRouter()
  // .mutation('add', {
  //   input: z.object({
  //     name: z.string().min(1).max(100),
  //   }),
  //   async resolve({ ctx, input }) {
  //     const { name } = input;

  //     try {
  //       await ctx.db.product.create({
  //         data: {
  //           name,
  //         },
  //       });
  //       return { success: true, message: 'Username set successfully' };
  //     } catch (error) {
  //       throw new Error(`Error creating product: ${error.message}`);
  //     }
  //   },
  // })
  .query('all', {
    input: z.object({
      userId: z.number(),
    }),
    async resolve({ ctx, input }) {
      try {
        console.log('sent request');

        const url = `${process.env.API_GATEWAY}/product`;

        const res = await axios.get(url);

        const data = res.data as {
          success: boolean;
          products: { id: number; name: string }[];
        };

        const ordersByUserUrl = `${process.env.API_GATEWAY}/product/orders-by-user/${input.userId}`;

        const ordersByUserRes = await axios.get(ordersByUserUrl);

        const ordersByUserData = ordersByUserRes.data as {
          id: number;
          userId: number;
          productId: number;
          isBought: boolean;
        }[];

        const orderedProductIds = ordersByUserData.map(
          (product) => product.productId
        );

        console.log('ordersByUserData', ordersByUserData);

        const temp = data.products.map((product) => ({
          ...product,
          isBought:
            ordersByUserData?.find((order) => order.productId === product.id)
              ?.isBought ?? false,
          isOrdered: orderedProductIds.includes(product.id),
        }));

        return temp;
      } catch (e) {
        throw new Error(`Error fetching products: ${e.message}`);
      }
    },
  });
