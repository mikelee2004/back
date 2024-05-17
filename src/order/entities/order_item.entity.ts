import {
    Entity,
    JoinColumn,
    OneToOne,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
  } from 'typeorm';
  import { ProductEntity } from 'src/product/entities/product.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { OrderEntity } from './order.entity';
  
@Entity()
export class OrderItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderPrice: number;

  @ManyToOne(() => OrderEntity, (order) => order.orderItems)
  order: OrderEntity;

  @ManyToOne(() => ProductEntity, (product) => product.orderItems)
  @JoinColumn()
  product: ProductEntity;
}