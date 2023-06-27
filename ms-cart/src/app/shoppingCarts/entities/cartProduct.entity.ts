import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
} from 'typeorm';
import { Cart } from './cart.entity';

@Entity()
export class CartProduct extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  productId: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Cart, (cart) => cart.cartProducts)
  cart: string;
}
