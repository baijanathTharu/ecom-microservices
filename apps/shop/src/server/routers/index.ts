import superjson from 'superjson';
import { createRouter } from '../utils/createRouter';
import { userRouter } from './userRouter';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('user.', userRouter);
// other merged routes here

// export type definition of API
export type AppRouter = typeof appRouter;
