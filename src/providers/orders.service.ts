import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderDto } from "src/dto/create_order.dto";
import { Order } from "src/entities/orders.entity";
import { Product } from "src/entities/product.entity";
import { Repository } from "typeorm";

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) { }

  async createOrder(createOrderDto: OrderDto): Promise<Order> {
    const { ...orderDetails } = createOrderDto;
    const order = this.orderRepository.create(orderDetails);
    return this.orderRepository.save(order);
  }

  async getAllOrders(): Promise<Order[]> {
    const orders = await this.orderRepository.find({ relations: ['products'] });

    for (const order of orders) {
      const productsWithCount = order.productsWithCount;
      const products: Product[] = [];

      for (const productWithCount of productsWithCount) {
        const product = await this.productRepository.findOneBy({ id: productWithCount.id });
        if (product) {
          const productWithCountAdded = { ...product, count: productWithCount.count };
          products.push(productWithCountAdded);
        }
      }

      order.products = products;
    }

    return orders;
  }

  async deleteOrder(id: string): Promise<void> {
    await this.orderRepository.delete(id)
  }

}
