import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { AuthModelClient as PrismaClient } from '@nx-prisma/prisma-clients/auth-model';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
