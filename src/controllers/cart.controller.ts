// import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
// import { CartService } from 'src/providers/cart.service';
// import { Cart } from 'src/entities/cart.entity';
// import { CreateCartItemDto } from 'src/dto/CartDto/create_cart_item.dto';
// import { UpdateCartItemDto } from 'src/dto/CartDto/update_cart_item.dto';

// @Controller('cart')
// export class CartController {
//   constructor(private readonly cartService: CartService) { }

//   @Post()
//   async addToCart(@Body() createCartItemDto: CreateCartItemDto): Promise<void> {
//     await this.cartService.addToCart(createCartItemDto.productId, createCartItemDto.quantity);
//   }

//   @Delete(':id')
//   async removeFromCart(@Param('id') id: string): Promise<void> {
//     await this.cartService.removeFromCart(id);
//   }

//   @Patch(':id')
//   async updateCart(@Param('id') id: string, @Body() updateCartItemDto: UpdateCartItemDto): Promise<void> {
//     await this.cartService.updateCartItemQuantity(id, updateCartItemDto.quantity);
// }

//   @Get()
//   async getCarts(): Promise<Cart[]> {
//     return this.cartService.getCartItems();
//   }

//   @Delete()
//   async clearCartItem(): Promise<void> {
//     await this.cartService.clearCartItem();
//   }
// }
