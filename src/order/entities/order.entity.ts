import {
    Entity,
    OneToMany,
    JoinColumn,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
    OneToOne,
  } from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { OrderItemEntity } from './order_item.entity';
  
@Entity()
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Fullname: string;

  @Column()
  address: string;

  @Column()
  totalPrice: number;

  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(() => UserEntity, (user) => user.order)
  @JoinColumn()
  user: UserEntity;

  @OneToMany(() => OrderItemEntity, (orderItems) => orderItems.order)
  orderItems: OrderItemEntity[];
}