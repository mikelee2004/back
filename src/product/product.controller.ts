import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Response,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ApiBearerAuth, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { fileStorage } from "src/product/storage";
import { ProductEntity } from "./entities/product.entity";
import { DeleteResult } from "typeorm";
import { JwtAuthGuard } from "src/auth/guards/jwt.guard";

@ApiTags("product")
@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("image", { storage: fileStorage }))
  create(
    @Body() dto: CreateProductDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<ProductEntity> {
    return this.productService.create(dto, image);
  }

  @Get()
  findAll(): Promise<ProductEntity[]> {
    return this.productService.findAll();
  }

  @Get("/image/:path")
  download(@Param("path") path: string, @Response() response) {
    return response.sendFile(path, { root: "./db_images/product" });
  }

  @Get(":id")
  findOne(@Param("id") id: string): Promise<ProductEntity> {
    return this.productService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("image", { storage: fileStorage }))
  update(
    @Param("id") id: string,
    @Body() dto: UpdateProductDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<ProductEntity> {
    return this.productService.update(+id, dto, image);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string): Promise<DeleteResult> {
    return this.productService.remove(+id);
  }
}
