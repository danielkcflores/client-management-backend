import { IsNumber, IsDate, IsInt, IsNotEmpty } from 'class-validator';

export class CreateOrderProductDto {

    @IsNumber()
    @IsNotEmpty()
    productId: number;

    @IsNumber()
    @IsNotEmpty()
    purchaseId: number;

    @IsInt()
    @IsNotEmpty()
    quantity: number;
  
    @IsDate()
    @IsNotEmpty()
    createdAt: Date;
  
    @IsNumber()
    @IsNotEmpty()
    productPrice: number;
  
    @IsNumber()
    @IsNotEmpty()
    totalPrice: number;
}