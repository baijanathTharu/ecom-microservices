import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { NodeHTTPCreateContextFnOptions } from '@trpc/server/adapters/node-http';
import { IncomingMessage } from 'http';
import ws from 'ws';
import { AdminModelClient } from '@nx-prisma/prisma-clients/admin-model';

const db = new AdminModelClient();

export const createContext = async ({
  req,
  res,
}:
  | trpcNext.CreateNextContextOptions
  | NodeHTTPCreateContextFnOptions<IncomingMessage, ws>) => {
  return {
    req,
    res,
    db,
  };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
