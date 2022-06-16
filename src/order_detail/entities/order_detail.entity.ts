import { Order } from '../../order/entities/order.entity';
import { Product } from '../../product/entities/product.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum OrderStatus {
  SHIPPING = 'SHIPPING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  PENDING = 'PENDING',
}

@Entity()
export class OrderDetail extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at?: Date;

  @ManyToOne(() => Order, (order) => order.order_details)
  order: Order;

  @ManyToOne(() => Product, (product) => product.order_details)
  product: Product;
}
