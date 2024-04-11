import { Controller, Get, Post, Delete, Body, Param, Patch, HttpException, HttpStatus, Query, UsePipes, ValidationPipe } from '@nestjs/common';
// import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDto } from 'src/dto/product.dto';
import { ValidationError } from 'class-validator';
import { ProductsService } from 'src/providers/product.service';

@Controller('products')
export class ProductController {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: ProductsService,
    ) {}

    @Get()
    async getProducts(
        @Query('category') category: string,
        @Query('sortByPrice') sortByPrice: string,
        @Query('searchValue') searchValue: string,
        @Query('minPrice') minPrice: number,
        @Query('maxPrice') maxPrice: number,
    ): Promise<Product[]> {
        try {
            let query = this.productRepository.createQueryBuilder('product');

            if (category) {
                query = query.where('product.category = :category', { category });
            }

            if (minPrice !== undefined && maxPrice !== undefined) {
                query = query.andWhere('product.price BETWEEN :minPrice AND :maxPrice', { minPrice, maxPrice });
            } else if (minPrice !== undefined) {
                query = query.andWhere('product.price > :minPrice', { minPrice });
            } else if (maxPrice !== undefined) {
                query = query.andWhere('product.price < :maxPrice', { maxPrice });
            }

            if (sortByPrice === 'ASC' || sortByPrice === 'DESC') {
                const orderDirection = sortByPrice === 'ASC' ? 'ASC' : 'DESC';
                query = query.orderBy('product.price', orderDirection);
            }

            if (searchValue) {
                query = query.andWhere(`product.name ILIKE :searchValue`, { searchValue: `%${searchValue}%` });
            }
            
            return await query.getMany();
        } catch (error) {
            console.log(error);
            if (error.status === 400) { 
                throw new HttpException('Invalid query parameters', HttpStatus.BAD_REQUEST);
            } else {
                throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async createProduct(@Body() dto: ProductDto): Promise<any> {
        try {
            // throw new Error('Тестовоя ошибка 500'); // fake 500 error
            const createdProduct = await this.productRepository.save(dto);
            return { message: 'Продукт успешно добавлен!!!', data: createdProduct };
        } catch (error) {
            console.error("Error creating product:", error);
            if (error instanceof ValidationError) {
                throw new HttpException({ message: 'Неверно заполнены данные!!!', errors: error }, HttpStatus.BAD_REQUEST);
            } else {
                throw new HttpException({ message: 'Server error!' }, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
    
    @Patch(':id')
    async updateProduct(@Param('id') id: any, @Body() product: Partial<Product>): Promise<Product> {
        try {
            await this.productRepository.update(id, product);
            const updatedProduct = await this.productRepository.findOneBy({id: id});
            if (!updatedProduct) {
                throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
            }
            return updatedProduct;
        } catch (error) {
           if (error instanceof ValidationError) {
            throw new HttpException({ message: 'Неверно заполнены данные!!!', errors: error }, HttpStatus.BAD_REQUEST);
        } else {
            throw new HttpException({ message: 'Server error!' }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        }
    }
    
    @Delete(':id')
    async deleteProduct(@Param('id') id: string): Promise<void> {
        try {
            await this.productRepository.delete(id);
        } catch (error) {
            if (error.status === 404 || error.status === 500) { 
                throw new HttpException('Invalid query parameters', HttpStatus.BAD_REQUEST);
            } else {
                throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
}