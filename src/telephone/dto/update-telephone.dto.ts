import { PartialType } from '@nestjs/mapped-types';
import { CreateTelephoneDto } from './create-telephone.dto';

export class UpdateTelephoneDto extends PartialType(CreateTelephoneDto) {}
