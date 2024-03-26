import { ProductEntity } from "src/product/entities/product.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('brand')
export class CarbrandEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => ProductEntity, product => product.brand)
    @JoinColumn()
    product: ProductEntity[];

}
