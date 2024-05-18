import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from 'src/order/entities/order.entity';
import { Repository } from 'typeorm';
import { OrderItemEntity } from './entities/order_item.entity';
import { CartService } from 'src/cart/cart.service';
import { UserEntity } from 'src/user/entities/user.entity';


@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
    @InjectRepository(OrderItemEntity)
    private orderItemRepository: Repository<OrderItemEntity>,
    private cartService: CartService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    
  ) {}
  async order(user: UserEntity, address: string): Promise<any> {

    const cartItems = await this.cartService.getItemsInCart(user.id);
    const subTotal = cartItems
      .map((cartItem) => cartItem.quantity * cartItem.product.price)
      .reduce((acc, next) => acc + next);

    const order = this.orderRepository.create();
    order.products = [];
    for (let i = 0; i <= cartItems.length; i++) {
      if (cartItems[i] && cartItems[i].product) {
        const orderProduct = this.orderItemRepository.create({
          product: cartItems[i].product,
          quantity: cartItems[i].quantity,
        });
        await this.orderItemRepository.save(orderProduct);
        order.products.push(orderProduct);
      }
    }
    order.address = address;
    order.price = subTotal;
    order.user = user;
    this.orderRepository.save(order);
    this.cartService.clearCart(user.id);
  }

  async getOrders(userId: number): Promise<OrderItemEntity[]> {
    const userOrder = await this.orderItemRepository
      .createQueryBuilder()
      .select('t.*')
      .from(OrderItemEntity, 't')
      .where('t.userId = :userId', { userId: userId })
      .execute();
    return userOrder;
  }
}