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

        // axios({
        //   method: 'get',
        //   url: `/api/trpc/product-all`,
        //   baseURL: process.env.ADMIN_BASE_URL,
        //   params: {
        //     batch: 1,
        //     input: 'some',
        //   },
        // })
        //   .then((res) => {
        //     // console.log('res', res);
        //     return { success: true, products: { name: 'test' } };
        //   })
        //   .catch((err) => {
        //     console.log('err', JSON.stringify(err.response.data, null, 2));
        //   });
        const data = await fetch(
          `${process.env.ADMIN_BASE_URL}/api/trpc/product-all?batch=1&input=some`,
          {
            method: 'GET',
          }
        );
        console.log('data', data);
        const json = await data.json();
        console.log('json', json);
      } catch (e) {
        throw new Error(`Error fetching products: ${e.message}`);
      }
    },
  });
