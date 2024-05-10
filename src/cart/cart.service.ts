import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Repository } from 'typeorm';
import { CartEntity } from './entities/cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/product/entities/product.entity';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class CartService {
  async getItemsInCart(userId: number): Promise<CartEntity[]> {
    console.log(userId);
    const userCart = await this.cartRepository.findBy({
      user: {id: userId}, 
    });
    return userCart;
  }

  constructor(
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,

    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,

    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(dto: CreateCartDto, userId: number) {

    const cartItem = new CartEntity();
    cartItem.user = await this.userRepository.findOneBy({ id: userId});
    console.log(cartItem.user.id, userId)
    cartItem.item = await this.productRepository.findOneBy({ id: dto.itemId })
    cartItem.quantity = dto.quantity;
    return await this.cartRepository.save(cartItem)
  //   const userCart = await this.cartRepository
  //   .createQueryBuilder()
  //   .select('cart.*')
  //   .from(CartEntity, 'cart')
  //   .where('cart.userId = :userId and cart.itemId = :itemId', { 
  //     userId: userId,
  //     itemId: dto.itemId, 
  //   })
  //   .execute();
  //   let cartItem;
  //   if (userCart.length === 0) {
  //     cartItem = new CartEntity();
  //     cartItem.quantity = dto.quantity;
  //     cartItem.user = await this.userRepository.findOneBy({ id: userId });
  //     cartItem.item = await this.productRepository.findOneBy({
  //       id: dto.itemId,
  //     });
  //   } else {
  //     userCart.quantity += dto.quantity;
  //   }
   
  //   const newCart = await this.cartRepository.save(cartItem);
  //   const product = await this.productRepository.findOne({
  //     where: { id: dto.itemId },
  //     relations: ['carts'],
  //   });
  //   const user = await this.userRepository.findOne({
  //     where: { id: userId },
  //   });
  //   await this.productRepository.save(product);
  //   await this.userRepository.save(user);

  //   return newCart;
  }

  async findAll() {
    return this.cartRepository.find();
  }

  async get(userId: number) {
    return await this.cartRepository
      .createQueryBuilder()
      .select()
      .from(CartEntity, 't')
      .where('t.userId = :userId', { userId: userId })
      .execute();
  }

  async update(dto: UpdateCartDto, userId: number) {
    const userCart = await this.cartRepository
      .createQueryBuilder()
      .select('t.*')
      .from(CartEntity, 't')
      .where('t.userId = :userId and t.itemId = :itemId', {
        userId: userId,
        itemId: dto.itemId,
      })
      .execute();
    if (userCart.length === 0) {
      throw new BadRequestException(`Записи с id=${dto.itemId} не найдено`);
    }
    console.log('update');
    console.log(userCart);

    userCart[0].quantity = userCart[0].quantity + dto.quantity;
    const updatedCart = await this.cartRepository.save(userCart);
    console.log('1d');
    return updatedCart;
  }

  async remove(id: number) {
    return this.cartRepository.delete(id);
  }

  async clearCart(userId: number) {
    await this.cartRepository
      .createQueryBuilder()
      .delete()
      .from(CartEntity)
      .where('userId = :userId', { userId: userId })
      .execute();
  }

}
