import { 
    Column, 
    CreateDateColumn, 
    Entity, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn 
} from "typeorm";

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column({ unique: true})
    email: string;

    @Column()
    password: string;

    @CreateDateColumn({ type: 'timestamp'})
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp'})
    updatedAt: Date;
    cart: any;
}
