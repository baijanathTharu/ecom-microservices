import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(private httpService: HttpService) {}

  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
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
