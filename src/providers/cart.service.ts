// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Cart } from 'src/entities/cart.entity';
// import { Product } from 'src/entities/product.entity';

// @Injectable()
// export class CartService {
//   constructor(
//     @InjectRepository(Cart)
//     private readonly cartRepository: Repository<Cart>,
//     @InjectRepository(Product)
//     private readonly productRepository: Repository<Product>,
//   ) { }

//   async addToCart(productId: string, quantity: number): Promise<void> {
//     const product = await this.productRepository.findOneBy({ id: productId });
//     if (!product) {
//       throw new Error('Product not found');
//     }

//     const cartItem = await this.cartRepository.findOne({
//       where: { product: { id: productId } },
//     });

//     if (cartItem) {
//       cartItem.product.count += quantity;
//       cartItem.product.price = cartItem.product.count * product.price;
//       await this.cartRepository.save(cartItem);
//     } else {
//       const newCartItem = new Cart();
//       newCartItem.product = product;
//       newCartItem.product.count = quantity;
//       newCartItem.product.price = quantity * product.price;
//       await this.cartRepository.save(newCartItem);
//     }
//   }

//   async removeFromCart(cartItemId: string): Promise<void> {
//     await this.cartRepository.delete({ id: cartItemId });
//   }

//   async updateCartItemQuantity(cartItemId: string, quantity: any): Promise<void> {
//     if (quantity && typeof quantity === 'object' && 'quantity' in quantity) {
//         const parsedQuantity = parseInt(quantity.quantity);
//         const cartItem = await this.cartRepository.findOne({ where: { id: cartItemId }, relations: ['product'] });
//         if (!cartItem) {
//             throw new Error('Cart item not found');
//         }

//         if (cartItem.product) {
//             cartItem.product.count = parsedQuantity;
//             await this.productRepository.update({ id: cartItem.product.id }, { count: parsedQuantity });
        
//           } else {
//             throw new Error('Product not found in cart item');
//         }
//     } else {
//         throw new Error('Invalid quantity format');
//     }
// }

//   async getCartItems(): Promise<Cart[]> {
//     return this.cartRepository.find();
//   }

//   async clearCartItem(): Promise<void> {
//     await this.cartRepository.clear();
//   }
// }
