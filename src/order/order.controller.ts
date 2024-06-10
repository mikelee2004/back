import {
  Controller,
  Post,
  Request,
  UseGuards,
  Body,
  Get,
  Req,
} from "@nestjs/common";
import { OrderService } from "src/order/order.service";
import { JwtAuthGuard } from "../auth/guards/jwt.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CreateOrderDto } from "./dto/create-order.dto";
@ApiTags("order")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("order")
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post("Create Order")
  create(@Body() dto: CreateOrderDto, @Req() req: any) {
    return this.orderService.order(req.user, dto.address);
  }
  @Get(":id")
  findOne(@Req() req: any) {
    return this.orderService.getOrders(req.user.id);
  }
}
