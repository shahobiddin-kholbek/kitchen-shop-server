import { Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Product } from 'src/entities/product.entity';

export async function deleteProduct(
    productRepository: Repository<Product>,
    id: string
): Promise<void> {
    try {
        const result = await productRepository.delete(id);
        if (result.affected === 0) {
            throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
        }
    } catch (error) {
        if (error.status === 404 || error.status === 500) {
            throw new HttpException('Invalid query parameters', HttpStatus.BAD_REQUEST);
        } else {
            throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
