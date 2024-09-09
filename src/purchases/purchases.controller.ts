import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PurchaseService } from './purchases.service';
import { Purchase } from './entities/purchase.entity';
import { CreatePurchaseDto } from './dto/create-purchase.dto';

@Controller('purchases')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post()
  async createPurchase(@Body() createPurchaseDto: CreatePurchaseDto) {
    console.log('Data received:', createPurchaseDto);  // Adicione este log
    return this.purchaseService.createPurchase(createPurchaseDto);
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