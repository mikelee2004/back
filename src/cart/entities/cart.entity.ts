import { ProductEntity } from "src/product/entities/product.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('cart')
export class CartEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserEntity, (user) => user.cart)
    @JoinColumn()
    user: UserEntity;

    @ManyToOne(() => ProductEntity, (product) => product.carts, {
        eager: true,
    })
    @JoinColumn()
    item: ProductEntity;

    @Column()
    quantity: number;
}
