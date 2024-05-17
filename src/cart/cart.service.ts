import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from 'src/user/entities/user.entity';
import { CartEntity } from './entities/cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateCartDto } from './dto/create-cart.dto';
import { ProductService } from 'src/product/product.service';
import { CartItemEntity } from './entities/cart-item.entity';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
    @InjectRepository(CartItemEntity)
    private readonly cartItemRepository: Repository<CartItemEntity>,
    private readonly productService: ProductService,
  ) {}

  async create(user: UserEntity): Promise<CartEntity> {
    const cart = new CartEntity();
    cart.user = user;
    await this.cartRepository.save(cart);
    return cart;
  }
  // async getItemsByUserId(userId: number): Promise<BasketItemEntity> {
  //   const basket = await this.basketRepository.findOne({ where: { userId } });
  //   return basket.items;
  // }

  async get(userId: number): Promise<number> {
    const basket = await this.cartRepository.findOne({
      where: { user: { id: userId } },
      relations: ['cartItems', 'cartItems.product'],
    });

    if (!basket) {
      throw new NotFoundException(
        'Невозможно найти корзину с таким id: ' + userId,
      );
    }

    return basket.getTotalPrice();
  }

  async CreateCartItemDto(dto: CreateCartDto, user: any) {
    const product = await this.productService.findOne(dto.productId);

    if (!product) {
      throw new NotFoundException(
        'Не нашлось продукта с таким id: ' + dto.productId,
      );
    }

    const userCart = await this.cartRepository.findOne({
      relations: {
        CartItems: {
          product: true,
        },
      },
      where: {
        user: user.id,
      },
    });

    // Вывод заголовка
    // Проверка на существование товара в корзине если да, то добавить, если нет вывести новый
    if (userCart.CartItems.some((x) => x.product.id == product.id)) {
      const cItem = userCart.CartItems.find(
        (x) => x.product.id == product.id,
      );
      cItem.Quantity += +dto.quantity;
      return await this.cartItemRepository.save(cItem);
    }

    const cartItem = this.cartItemRepository.create({
      product: product,
      Quantity: +dto.quantity,
    });
    cartItem.cartPrice = product.price * dto.quantity;
    cartItem.cart = userCart;
    return await this.cartItemRepository.save(cartItem);
  }

  async findAll(user: any) {
    const userCart = await this.cartRepository.findOne({
      relations: {
        CartItems: {
          product: true,
        },
      },
      where: {
        user: user.id,
      },
    });
    return userCart.CartItems;
  }

  async findOne(productId: number, user: any) {
    const userCart = await this.cartRepository.findOne({
      relations: {
        CartItems: {
          product: true,
        },
      },
      where: {
        user: user.id,
      },
    });

    const product = userCart.CartItems.find((x) => x.id == productId);

    if (!product) {
      throw new NotFoundException('Данный товар не найлен!');
    }

    return product;
  }

  async update(dto: UpdateCartDto, user: any) {
    const userCart = await this.cartRepository.findOne({
      relations: {
        CartItems: {
          product: true,
        },
      },
      where: {
        user: user.id,
      },
    });

    const cartItem = await this.cartItemRepository.findOne({
      relations: {
        cart: true,
        product: true,
      },
      where: {
        product: await this.productService.findOne(dto.productId),
        cart: userCart,
      },
    });

    if (!cartItem) {
      throw new NotFoundException(
        'Товар с таким id не найден: ' + dto.productId,
      );
    }

    cartItem.Quantity = dto.quantity;
    if (cartItem.Quantity == 0) {
      return await this.cartItemRepository.remove(cartItem);
    }
    return await this.cartItemRepository.save(cartItem);
  }

  async remove(productId: number, user: any): Promise<DeleteResult> {
    const userCart = await this.cartRepository.findOne({
      relations: {
        CartItems: {
          product: true,
        },
      },
      where: {
        user: user.id,
      },
    });

    const cartItem = await this.cartItemRepository.findOne({
      relations: {
        cart: true,
        product: true,
      },
      where: {
        product: await this.productService.findOne(productId),
        cart: userCart,
      },
    });

    if (!CartItemEntity) {
      throw new NotFoundException("Товар с id ${id} не найден!");
    }

    return await this.cartItemRepository.delete(cartItem);
  }

  async removeCart(user: any): Promise<DeleteResult> {
    const userCart = await this.cartRepository.findOne({
      relations: {
        CartItems: {
          product: true,
        },
      },
      where: {
        user: user.id,
      },
    });

    if (!userCart) {
      throw new NotFoundException();
    }

    await this.cartItemRepository
      .createQueryBuilder()
      .delete()
      .where('cartId = :cartId', { cartId: userCart.id })
      .execute();

    userCart.CartItems = [];
    await this.cartRepository.save(userCart);

    return await this.cartRepository.delete(userCart.id);
  }
  async getUserCart(user: any) {
    const userCart = await this.cartRepository.findOne({
      relations: {
        CartItems: {
          product: true,
        },
      },
      where: {
        user: user.id,
      },
    });
    return userCart;
  }
}