import { 
    Column, 
    Entity, 
    JoinColumn, 
    ManyToMany, 
    ManyToOne, 
    OneToMany, 
    PrimaryGeneratedColumn, 
} from "typeorm";

import { CategoryEntity } from "src/category/entities/category.entity";
import { CartEntity } from "src/cart/entities/cart.entity";
import { CarbrandEntity } from "src/carbrand/entities/carbrand.entity";
import { CartItemEntity } from "src/cart/entities/cart-item.entity";
import { ApiHideProperty } from "@nestjs/swagger";
import { OrderItemEntity } from "src/order/entities/order_item.entity";


@Entity('product')
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    image: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    amount: number;

    @Column()
    price: number;

    @ManyToOne(() => CategoryEntity, {
        eager: true,
    })
    @JoinColumn()
    category: CategoryEntity;


    @ManyToOne(() => CarbrandEntity, {
        eager: true,
    })
    @JoinColumn()
    carbrand: CarbrandEntity;

    @ApiHideProperty()
    @OneToMany(() => CartItemEntity, (cart) => cart.product)
    cart: CartItemEntity[];
    @ApiHideProperty()
    @OneToMany(() => OrderItemEntity, (orderItems) => orderItems.product)
    orderItems: CartItemEntity[];

}

