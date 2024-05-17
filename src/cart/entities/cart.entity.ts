import { ProductEntity } from "src/product/entities/product.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CartItemEntity } from "./cart-item.entity";

@Entity('cart')
export class CartEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    total: number;
    
    @Column()
    quantity: number;

    @OneToMany(() => CartItemEntity, (cartItem) => cartItem.cart)
    CartItems: CartItemEntity[];

    @OneToOne(() => UserEntity, (user) => user.cart)
    @JoinColumn()
    user: UserEntity;

    @ManyToOne(() => ProductEntity, (product) => product.id, {
        eager: true
    })
    @JoinColumn()
    item: ProductEntity;

    getTotalPrice() {
        if (this.CartItems == null) {
          return 0;
        }
        let sum = 0;
        this.CartItems.forEach((a) => (sum += a.product.price * a.Quantity));
        return sum;
      }
}
