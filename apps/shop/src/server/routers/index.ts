import superjson from 'superjson';
import { createRouter } from '../utils/createRouter';
import { productRouter } from './productRouter';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('product-', productRouter);
// other merged routes here

// export type definition of API
export type AppRouter = typeof appRouter;
