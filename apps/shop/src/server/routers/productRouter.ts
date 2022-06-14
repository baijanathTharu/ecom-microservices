import axios from 'axios';
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
    async resolve({ ctx, input }) {
      try {
        console.log('sent request');

        const url = `${process.env.API_GATEWAY}/product`;

        const response = await axios.get(url);

        const data = response.data as {
          success: boolean;
          products: { id: number; name: string }[];
        };

        return data;
      } catch (e) {
        throw new Error(`Error fetching products: ${e.message}`);
      }
    },
  });
