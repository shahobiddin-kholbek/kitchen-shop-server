import { Repository } from 'typeorm';
import { Product } from '../../entities/product.entity';

export async function getProducts(
    productRepository: Repository<Product>,
    category: string,
    sortByPrice: string,
    searchValue: string,
    minPrice: number,
    maxPrice: number,
): Promise<Product[]> {
    let query = productRepository.createQueryBuilder('product');

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
        const orderDirection = sortByPrice === 'ASC' ? 'ASC' : 'DESC'
        query = query.orderBy('product.price', orderDirection);
    }

    if (searchValue) {
        query = query.andWhere(`product.name ILIKE :searchValue`, { searchValue: `%${searchValue}%` });
    }

    return await query.getMany();
}
