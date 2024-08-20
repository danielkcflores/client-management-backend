import { PartialType } from '@nestjs/mapped-types';
import { CreateDependentDto } from './create-dependent.dto';

export class UpdateDependentDto extends PartialType(CreateDependentDto) {}
