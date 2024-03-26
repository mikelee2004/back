import { ProductEntity } from "src/product/entities/product.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('cart')
export class CartEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    total: number;
    
    @Column()
    quantity: number;

    @ManyToOne(() => UserEntity, (user) => user.id)
    @JoinColumn()
    user: UserEntity;

    @ManyToOne(() => ProductEntity, (product) => product.id, {
        eager: true
    })
    @JoinColumn()
    item: ProductEntity;
}
