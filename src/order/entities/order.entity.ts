import {
  Entity,
  OneToMany,
  JoinColumn,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  OneToOne,
} from "typeorm";
import { UserEntity } from "src/user/entities/user.entity";
import { OrderItemEntity } from "./order_item.entity";

@Entity("order")
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: "userId" })
  user: UserEntity;

  @Column()
  address: string;

  @Column()
  price: number;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order)
  @JoinColumn({ name: "products" })
  products: OrderItemEntity[];
}
