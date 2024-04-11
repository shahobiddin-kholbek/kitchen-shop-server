import { Controller, Post, Get, Body, Delete, Param, HttpException, HttpStatus } from '@nestjs/common';
import { OrdersService } from '../providers/orders.service';
import { OrderDto } from '../dto/create_order.dto';
import { Order } from 'src/entities/orders.entity';

@Controller('orders') 
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(@Body() orderDto: OrderDto): Promise<Order> {
    try {
      return await this.ordersService.createOrder(orderDto);
    } catch (error) {
      console.log('Error occurred while creating order:', error.message);
      throw new HttpException('Failed to create order', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async getAllOrders(): Promise<Order[]> {
    return this.ordersService.getAllOrders();
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: string): Promise<void>{
    try {
      await this.ordersService.deleteOrder(id)
    } catch (err) {
      console.log('Delete rejected!!');
      
      throw new HttpException('Invalid query parameters', HttpStatus.BAD_REQUEST);
      
    }
  }

  
}
