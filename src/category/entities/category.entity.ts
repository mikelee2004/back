import { 
    Column, 
    CreateDateColumn, 
    Entity, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn
} from 'typeorm';

@Entity('category')
export class CategoryEntity {
    @PrimaryGeneratedColumn({ name: 'category_id'})
    id: number;

    @Column({ name: 'category_name'})
    name: string;

    @CreateDateColumn({ name: 'category_cd'})
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

