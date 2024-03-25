import { 
    Column, 
    Entity, 
    JoinColumn, 
    ManyToOne, 
    PrimaryGeneratedColumn 
} from "typeorm";

import { CategoryEntity } from "src/category/entities/category.entity";


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

    @ManyToOne(() => CategoryEntity, (category) => category.products, {
        eager: true,
    })
    @JoinColumn()
    category: CategoryEntity;
}
