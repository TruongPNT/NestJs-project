import { PartialType } from '@nestjs/mapped-types';
import { CreateFlashsaleDto } from './create-flashsale.dto';

export class UpdateFlashsaleDto extends PartialType(CreateFlashsaleDto) {}
