export class CreateAddressDto {
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;  // corrigido
  cep: string;
  clienteId: number;
}
