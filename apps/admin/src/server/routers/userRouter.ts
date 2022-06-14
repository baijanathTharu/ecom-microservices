import axios from 'axios';
import z from 'zod';
import { createRouter } from '../utils/createRouter';

const USER_AUTH_BASE_URL = `${process.env.AUTH_BASE_URL}/user`;

export const userRouter = createRouter()
  .mutation('login', {
    input: z.object({
      email: z.string().min(1).max(100),
    }),
    async resolve({ ctx, input }) {
      const { email } = input;

      try {
        const url = `${USER_AUTH_BASE_URL}/login`;

        const response = await axios.post(url, { email });

        const data = response.data as { id: number; email: string };

        return data;
      } catch (error) {
        throw new Error(`Error creating product: ${error.message}`);
      }
    },
  })
  .query('byId', {
    input: z.object({
      id: z.number().min(1),
    }),
    async resolve({ ctx, input }) {
      try {
        const response = await axios.get(`${USER_AUTH_BASE_URL}/${input.id}`);

        const data = response.data;
        console.log('data', data);
        return data;
      } catch (e) {
        throw new Error(`Error fetching products: ${e.message}`);
      }
    },
  });
