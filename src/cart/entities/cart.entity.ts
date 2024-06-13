import { ProductEntity } from "src/product/entities/product.entity";
import { UserEntity } from "src/user/entities/user.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("cart")
export class CartEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => ProductEntity, (product) => product.id, {
    eager: true,
  })
  @JoinColumn()
  product: ProductEntity;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn()
  user: UserEntity;
}
