import { ApiHideProperty } from '@nestjs/swagger';
import { CarbrandEntity } from 'src/carbrand/entities/carbrand.entity';
import { ProductEntity } from 'src/product/entities/product.entity';
import {
    Column, 
    CreateDateColumn, 
    Entity, 
    OneToMany, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn
} from 'typeorm';

@Entity('category')
export class CategoryEntity {
    @PrimaryGeneratedColumn({ name: 'id'})
    id: number;

    @Column({ name: 'category_name'})
    name: string;

    @Column()
    image: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
    
}

