import { Module } from '@nestjs/common';
import { ProductModule } from '../modules/product/product.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
