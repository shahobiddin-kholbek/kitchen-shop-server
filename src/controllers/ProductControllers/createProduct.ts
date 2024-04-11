import { Repository } from 'typeorm';
import { Product } from '../../entities/product.entity';
import { ProductDto } from 'src/dto/product.dto';
import { ValidationError } from 'class-validator';
import { HttpException, HttpStatus } from '@nestjs/common';

export async function createProduct(
    productRepository: Repository<Product>,
    dto: ProductDto,
): Promise<any> {
    try {
        const createdProduct = await productRepository.save(dto);
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
