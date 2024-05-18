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
  
@Entity('order_item_entity')
export class OrderItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => ProductEntity, (product) => product.id)
  @JoinColumn()
  product: ProductEntity;

  @ManyToOne(() => OrderEntity, (order) => order.products)
  order: OrderEntity;
}