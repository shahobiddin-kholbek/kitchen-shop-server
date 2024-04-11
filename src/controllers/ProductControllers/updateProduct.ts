import { HttpException, HttpStatus } from "@nestjs/common";
import { Product } from "src/entities/product.entity";
import { Repository } from "typeorm";


export async function updateProduct(
    productRepository: Repository<Product>,
    id: any,
    product: Partial<Product>
): Promise<any> {
    try {
        await productRepository.update(id, product);
        const updatedProduct = await productRepository.findOneBy({id: id});
        if (!updatedProduct) {
            throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
        }
        return updatedProduct;
    } catch (error) {
        console.log('UpdateError:', error);
        if (error.status === 400 || error.status === 500) { 
            throw new HttpException('Invalid query parameters', HttpStatus.BAD_REQUEST);
        } else {
            throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}