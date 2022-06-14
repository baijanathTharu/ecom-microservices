import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

@Module({
  imports: [HttpModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
