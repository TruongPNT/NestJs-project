import { ItemFlashsale } from '../../item-flashsales/entities/item-flashsale.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  DeleteDateColumn,
} from 'typeorm';
@Entity()
export class Flashsale {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('text')
  description: string;

  @Column('timestamp')
  startSale: Date;

  @Column('timestamp')
  endSale: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at?: Date;

  @OneToMany(() => ItemFlashsale, (itemFlashsale) => itemFlashsale.flashsale)
  itemFlashsale: ItemFlashsale[];
}
