import { z } from 'zod';
import { createRouter } from '../utils/createRouter';

export const userRouter = createRouter()
  .mutation('set-username', {
    input: z.object({
      username: z.string(),
      email: z.string().email(),
    }),
    async resolve({ ctx, input }) {
      return { success: true, message: 'Username set successfully' };
    },
  })
  .query('get-user', {
    input: z.object({
      email: z.string().email(),
    }),
    async resolve({ ctx, input }) {
      return { success: true, user: { email: input.email } };
    },
  });
