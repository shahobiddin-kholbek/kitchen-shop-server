
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { ProductDto } from 'src/dto/product.dto';

@Injectable()
export class ProductsService {
    save: any;
    findOneBy: any;
    update: any;
    delete: any;
    createQueryBuilder: any;
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async createProduct(dto: ProductDto): Promise<Product> {
    return await this.productsRepository.save(dto);
  }

  async getProducts(): Promise<Product[]> {
    return await this.productsRepository.find();
  }

  async getProductById(id: any): Promise<Product | undefined> {
    return await this.productsRepository.findOne(id);
  }

  async updateProduct(id: string, dto: ProductDto): Promise<Product | undefined> {
    const product = await this.getProductById(id);
    const updatedProduct = Object.assign(product, dto);
    return await this.productsRepository.save(updatedProduct);
  }

  async deleteProduct(id: string): Promise<void> {
    await this.productsRepository.delete(id);
  }
}
