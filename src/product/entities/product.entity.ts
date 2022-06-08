import { OrderDetail } from './../../order_detail/entities/order_detail.entity';
import { ImgDetail } from '../../img-detail/entities/img-detail.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from 'src/category/entities/category.entity';
import { ItemFlashsale } from 'src/item-flashsales/entities/item-flashsale.entity';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  barcode: string;

  @Column()
  import_price: number;

  @Column()
  sell_price: number;

  @Column({ default: false })
  is_sale: boolean;

  @Column('integer')
  quantity: number;

  @Column()
  product_img: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at?: Date;

  @OneToMany(() => ImgDetail, (imgdetail) => imgdetail.product)
  imgDetail: ImgDetail[];

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @OneToMany(() => ItemFlashsale, (itemFlashsale) => itemFlashsale.product)
  itemFlashsale: ItemFlashsale[];

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product)
  order_details: OrderDetail[];
}
