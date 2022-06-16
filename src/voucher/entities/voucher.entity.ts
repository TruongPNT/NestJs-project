import { Order } from '../../order/entities/order.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum VoucherType {
  'DONG' = 'đ',
  'PERCENT' = '%',
}

@Entity()
export class Voucher extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  code?: string;

  @Column()
  note?: string;

  @Column()
  quantity?: number;

  @Column()
  discount?: number;

  @Column('text')
  unit: VoucherType;

  @Column({ default: true })
  status?: boolean;

  @Column('timestamp')
  startTime: Date;

  @Column('timestamp')
  endTime: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at?: Date;

  @OneToMany(() => Order, (order: Order) => order.voucher)
  orders: Order[];
}
