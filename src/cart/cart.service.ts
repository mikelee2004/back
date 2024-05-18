import { BadRequestException, Injectable } from '@nestjs/common';
import { UserEntity } from 'src/user/entities/user.entity';
import { CartEntity } from './entities/cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ProductEntity } from 'src/product/entities/product.entity';
import { CreateCartDto } from './dto/create-cart.dto';


@Injectable()
export class CartService {
  async getItemsInCart(userId: number): Promise<CartEntity[]> {

    const userCart = await this.cartRepository.findBy({
      user: {id: userId},
    });
    return userCart;
  }

  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,

    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

  ) {}

  async create(dto: CreateCartDto, userId: number): Promise<CartEntity> {
    const cartItem = new CartEntity();
    cartItem.user = await this.userRepository.findOneBy({ id: userId });
    console.log(cartItem.user.id, userId);
    cartItem.item = await this.productRepository.findOneBy({
      id: dto.itemId,
    });
    cartItem.quantity = dto.quantity;
    return await this.cartRepository.save(cartItem);
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
    // update existing record

    userCart[0].quantity = userCart[0].quantity + dto.quantity;
    const updatedCart = await this.cartRepository.save(userCart);
    console.log('1d');
    return updatedCart;
  }

  async findAll() {
    return this.cartRepository.find()
  }

  async get(userId: number) {
    return await this.cartRepository
      .createQueryBuilder()
      .select()
      .from(CartEntity,'t')
      .where('t.userId = :userId', { userId: userId } )
      .execute();
  }

  async remove(id: number) {
    return this.cartRepository.delete(id)
  }

  async clearCart(userId: number) {
    await this.cartRepository
      .createQueryBuilder()
      .delete()
      .from(CartEntity)
      .where('userId = :userId', { userId: userId})
      .execute()
  }
}