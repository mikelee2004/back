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
    const userCart = await this.cartRepository.find({
      relations: ['item', 'user'], 
    });
    return (await userCart).filter((item) => item.user.id === userId);
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
    const userCart = await this.cartRepository
    .createQueryBuilder()
    .select('cart.*')
    .from(CartEntity, 'cart')
    .where('cart.userId = :userId and cart.itemId = :itemId', { 
      userId: userId,
      itemId: dto.itemId, 
    })
    .execute();
    let cartItem;
    if (userCart.length === 0) {
      cartItem = new CartEntity();
      cartItem.quantity = dto.quantity;
      cartItem.user = await this.userRepository.findOneBy({ id: userId });
      cartItem.item = await this.productRepository.findOneBy({
        id: dto.itemId,
      });
    } else {
      userCart.quantity += dto.quantity;
    }
   
    const newCart = await this.cartRepository.save(cartItem);
    const product = await this.productRepository.findOne({
      where: { id: dto.itemId },
      relations: ['carts'],
    });
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    await this.productRepository.save(product);
    await this.userRepository.save(user);

    return newCart;
  }

  async findAll() {
    return this.cartRepository.find();
  }

  async get(userId: number) {
    return await this.cartRepository
    .createQueryBuilder()
    .select()
    .from(CartEntity, 'cart')
    .where('cart.userId = :userId', { userId: userId })
    .execute();
  }

  async update(id: number, dto: UpdateCartDto) {
    const toUpdate = await this.cartRepository.findOneBy({ id });
    if (!toUpdate) {
      throw new BadRequestException(`Записи с id=${id} не нашлось! :(`);
    }
    if (dto.quantity) {
      toUpdate.quantity = dto.quantity;
    }
    return this.cartRepository.save(toUpdate);
  }

  async remove(id: number) {
    return this.cartRepository.delete({ id });
  }

  // Планируется реализовать: очистка корзины пользователя.
}
