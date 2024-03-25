import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('promo')
export class PromoEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    image: string;

    @Column()
    title: string;

    @Column()
    text: string;

    @Column()
    rating: number;

    @Column()
    price: number;
}
