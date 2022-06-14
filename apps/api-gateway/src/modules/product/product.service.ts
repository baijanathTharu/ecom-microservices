import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { lastValueFrom, map, tap } from 'rxjs';

@Injectable()
export class ProductService {
  constructor(private httpService: HttpService) {}

  create(arg) {
    return `This action creates a new product`;
  }

  async createOrder(createOrderDto: { userId: number; productId: number }) {
    try {
      const url = `${process.env.ADMIN_BASE_URL}/api/trpc/product-create-order`;

      // this.httpService.post(url, createOrderDto).pipe(
      //   tap((resp) => console.log(resp)),
      //   map((resp) => resp.data),
      //   tap((data) => {
      //     console.log('data', data);
      //     return {
      //       success: true,
      //       message: 'Product ordered successfully',
      //     };
      //   })
      // );

      const data = await lastValueFrom(
        this.httpService.post(url, createOrderDto).pipe(map((res) => res.data))
      );

      console.log('data', data);

      return {
        success: false,
        error: 'something went wrong',
      };
    } catch (error) {
      console.log('something went wrong', JSON.stringify(error, null, 2));
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async findAll() {
    try {
      const url = `${process.env.ADMIN_BASE_URL}/api/trpc/product-all`;

      const res = await this.httpService.get(url).toPromise();

      const data = res.data;

      const temp = data.result.data.json as { products: Product[] };

      return temp;
    } catch (error) {
      console.log('something went wrong', JSON.stringify(error, null, 2));
      return {
        success: false,
        error: error.message,
        products: [],
      };
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
