import { PartialType } from '@nestjs/mapped-types';
import { CreateItemFlashsaleDto } from './create-item-flashsale.dto';

export class UpdateItemFlashsaleDto extends PartialType(CreateItemFlashsaleDto) {}
