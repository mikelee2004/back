import { 
    ChildEntity,
    Column, 
    Entity, 
    JoinColumn, 
    ManyToMany, 
    ManyToOne, 
    OneToMany, 
    PrimaryGeneratedColumn, 
    TableInheritance
} from "typeorm";

import { CategoryEntity } from "src/category/entities/category.entity";
import { CartEntity } from "src/cart/entities/cart.entity";
import { CarbrandEntity } from "src/carbrand/entities/carbrand.entity";


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

    @OneToMany(() => CartEntity, (cart) => cart.item)
    carts: CartEntity[];


}

