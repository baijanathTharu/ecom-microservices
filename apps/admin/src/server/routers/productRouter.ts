import { z } from 'zod';
import { createRouter } from '../utils/createRouter';

export const productRouter = createRouter()
  .mutation('add', {
    input: z.object({
      name: z.string().min(1).max(100),
    }),
    async resolve({ ctx, input }) {
      const { name } = input;

      try {
        await ctx.db.product.create({
          data: {
            name,
          },
        });
        return { success: true, message: 'Username set successfully' };
      } catch (error) {
        throw new Error(`Error creating product: ${error.message}`);
      }
    },
  })
  .query('all', {
    async resolve({ ctx }) {
      try {
        console.log('got request');
        const products = await ctx.db.product.findMany();
        return { success: true, products: products };
      } catch (e) {
        throw new Error(`Error fetching products: ${e.message}`);
      }
    },
  });
