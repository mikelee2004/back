import { timestamp } from "rxjs";
import { CartEntity } from "src/cart/entities/cart.entity";
import { OrderEntity } from "src/order/entities/order.entity";
import { Roles } from "src/utility/common/user-roles.enum";
import { 
    Column, 
    CreateDateColumn, 
    Entity, 
    OneToOne, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn 
} from "typeorm";

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @CreateDateColumn({ type: 'timestamp'})
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp'})
    updatedAt: Date;

    @Column({type: 'enum', enum: Roles, array: true, default: [Roles.USER]})
    roles: Roles[]

}
