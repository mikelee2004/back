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
  async getItemsInCart(user: string): Promise<CartEntity[]> {
    const userCart = await this.cartRepository.find({
      relations: ['item', 'user'], 
    });
    return (await userCart).filter((item) => item.user.email === user);
  }
  constructor(
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,

    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,

    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(dto: CreateCartDto) {
    const cart = new CartEntity();
    cart.quantity = dto.quantity;
    cart.user = await this.userRepository.findOneBy({ id: dto.userId });
    cart.item = await this.productRepository.findOneBy({ id: dto.itemId });

    const newCart = await this.cartRepository.save(cart);
    const product = await this.productRepository.findOne({
      where: { id: dto.itemId },
      relations: ['carts'],
    });
    if (product.carts != null) {
      product.carts.push(cart);
    }

    await this.productRepository.save(product);

    return newCart;
  }

  async findAll() {
    return this.cartRepository.find();
  }

  async findOne(id: number) {
    return this.cartRepository.findOneBy({ id });
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
}
