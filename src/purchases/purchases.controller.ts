import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { PurchaseService } from './purchases.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { Purchase } from './entities/purchase.entity';

@Controller('purchases')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post('cadastrar')
  async create(@Body() createPurchaseDto: CreatePurchaseDto): Promise<Purchase> {
    return this.purchaseService.create(createPurchaseDto);
  }

  @Get('relatorio')
  async findAllWithDetails(): Promise<Purchase[]> {
    return this.purchaseService.findAllWithDetails();
  }

  @Get('buscar')
async search(@Query('searchText') searchText: string): Promise<Purchase[]> {
  return this.purchaseService.search(searchText);
}
}