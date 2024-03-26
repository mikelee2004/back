import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { CartService } from 'src/cart/cart.service';
import { OrderItemEntity } from './entities/order_item.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderItemEntity)
    private orderItemRepository: Repository<OrderItemEntity>,
    
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,

    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private cartService: CartService,
  
    ) {}
  async order(user: UserEntity, address: string): Promise<any> {
    const cartItems = await this.cartService.getItemsInCart(user.id);
    const subTotal = cartItems
      .map((cartItem) => cartItem.quantity * cartItem.item.price)
      .reduce((acc, next) => acc + next);

    const order = this.orderRepository.create();
    order.items = [];
    for (let i = 0; i <= cartItems.length; i++) {
      if (cartItems[i] && cartItems[i].item) {
        const orderItem = this.orderItemRepository.create({
          item: cartItems[i].item,
          quantity: cartItems[i].quantity,
        });
        await this.orderItemRepository.save(orderItem);
        order.items.push(orderItem);
      }
    }
    order.address = address;
    order.totalPrice = subTotal;
    order.user = user;
    this.orderRepository.save(order);
    }
  async getOrders(userId: number): Promise<OrderItemEntity[]> {
    const userOrder = await this.orderItemRepository
      .createQueryBuilder()
      .select('cart')
      .from(OrderItemEntity, 'cart')
      .where('cart.userId = :userId', { userId: userId })
      .execute();
    return userOrder;
  }
}
