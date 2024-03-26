import { 
    ChildEntity,
    Column, 
    Entity, 
    JoinColumn, 
    ManyToMany, 
    ManyToOne, 
    PrimaryGeneratedColumn, 
    TableInheritance
} from "typeorm";

import { CategoryEntity } from "src/category/entities/category.entity";
import { CartEntity } from "src/cart/entities/cart.entity";
import { CarbrandEntity } from "src/carbrand/entities/carbrand.entity";


@Entity('product')
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
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
    brand: CarbrandEntity;
}

@ChildEntity('Oil')
export class OilEntity extends ProductEntity {
    // бочка/бутылка
    @Column()
    oilPackType: string;

    // объем бутылки/бочки
    @Column()
    oilCapacity: number;

    // назначение масла
    @Column()
    oilPurpose: string;
    
    // вязкость
    @Column()
    oilViscosity: string;
}
