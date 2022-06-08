import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
} from '@nestjs/common';
import { ItemFlashsalesService } from './item-flashsales.service';
import { CreateItemFlashsaleDto } from './dto/create-item-flashsale.dto';
import { UpdateItemFlashsaleDto } from './dto/update-item-flashsale.dto';
import { Flashsale } from 'src/flashsales/entities/flashsale.entity';
import { HttpExceptionFilter } from 'src/filter/http-exception.filter';

@Controller('item-flashsales')
@UseFilters(HttpExceptionFilter)
export class ItemFlashsalesController {
  constructor(private readonly itemFlashsalesService: ItemFlashsalesService) {}

  @Post()
  create(
    @Body() createItemFlashsaleDto: CreateItemFlashsaleDto,
    flashsale: Flashsale,
  ) {
    return this.itemFlashsalesService.create(createItemFlashsaleDto, flashsale);
  }

  @Get()
  findAll() {
    return this.itemFlashsalesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemFlashsalesService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemFlashsalesService.remove(id);
  }
}
