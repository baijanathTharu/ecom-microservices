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
        console.log('error', error);
        throw new Error(`Error creating product: ${error.message}`);
      }
    },
  })
  .mutation('create-order', {
    input: z.object({
      userId: z.number().int().min(1),
      productId: z.number().int().min(1),
    }),
    async resolve({ ctx, input }) {
      const { userId, productId } = input;

      console.log('input', input);

      try {
        await ctx.db.productBought.create({
          data: {
            productId,
            userId,
          },
        });
        return { success: true, message: 'Product ordered successfully' };
      } catch (error) {
        throw new Error(`Error ordering product: ${error.message}`);
      }
    },
  })
  .mutation('deliver-order', {
    input: z.object({
      userId: z.number().int().min(1),
      productId: z.number().int().min(1),
    }),
    async resolve({ ctx, input }) {
      const { userId, productId } = input;

      try {
        const productBought = await ctx.db.productBought.findFirst({
          where: {
            userId,
            productId,
          },
        });
        await ctx.db.productBought.update({
          where: {
            id: productBought.id,
          },
          data: {
            isBought: true,
          },
        });
        return { success: true, message: 'Product delivered successfully' };
      } catch (error) {
        throw new Error(`Error ordering product: ${error.message}`);
      }
    },
  })
  .query('all', {
    async resolve({ ctx }) {
      try {
        const products = await ctx.db.product.findMany();
        return { success: true, products: products };
      } catch (e) {
        throw new Error(`Error fetching products: ${e.message}`);
      }
    },
  })
  .query('bought', {
    async resolve({ ctx }) {
      try {
        const products = await ctx.db.productBought.findMany();
        return { success: true, products: products };
      } catch (e) {
        throw new Error(`Error fetching products: ${e.message}`);
      }
    },
  });
