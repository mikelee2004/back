import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    //OneToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { ProductEntity } from 'src/product/entities/product.entity';
  import { CartEntity } from './cart.entity';

  @Entity()
  export class CartItemEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    Quantity: number;
  
    @Column()
    cartPrice: number;
    
    @ManyToOne(() => ProductEntity, (product) => product.cart)
    @JoinColumn()
    product: ProductEntity;
  
    @ManyToOne(() => CartEntity, (cart) => cart.CartItems)
    cart: CartEntity;
  }