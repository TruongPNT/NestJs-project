import { Product } from '../../product/entities/product.entity';
import { Flashsale } from '../../flashsales/entities/flashsale.entity';
import {
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class ItemFlashsale {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  discount: number;

  @Column('int')
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at?: Date;

  @ManyToOne(() => Flashsale, (flashsale) => flashsale.itemFlashsale)
  flashsale: Flashsale;

  @ManyToOne(() => Product, (product) => product.itemFlashsale)
  product: Product;
}
