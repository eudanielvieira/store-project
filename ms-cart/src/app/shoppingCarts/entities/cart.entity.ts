import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { CartProduct } from './CartProduct.entity';

@Entity()
export class Cart extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 'active' })
  status: string;

  @Column()
  userId: string;

  @Column()
  totalPrice: number;

  @Column()
  totalQuantity: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => CartProduct, (cartProduct) => cartProduct.cart)
  cartProducts: CartProduct[];
}
