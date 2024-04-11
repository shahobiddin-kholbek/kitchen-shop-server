import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Order } from './orders.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Order, order => order.products)
  order: Order[];

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  description: string;

  @Column()
  rating: string;

  @Column()
  category: string;

  @Column('jsonb', { nullable: true })
  img: string[];
  push: any;
}
