import { IsDate, IsNotEmpty } from "class-validator";

  export class CreatePurchaseDto {
    clienteId: number;

    @IsDate()
    @IsNotEmpty()
    createdAt: Date;
    
    products: {
      productId: number;
      quantity: number;
    }[];
  }
