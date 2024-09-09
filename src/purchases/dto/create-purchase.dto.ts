  export class CreatePurchaseDto {
    clienteId: number;
    products: {
      productId: number;
      quantity: number;
    }[];
  }
