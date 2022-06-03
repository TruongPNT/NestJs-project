import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ItemFlashsalesService } from './item-flashsales.service';
import { CreateItemFlashsaleDto } from './dto/create-item-flashsale.dto';
import { UpdateItemFlashsaleDto } from './dto/update-item-flashsale.dto';
import { Flashsale } from 'src/flashsales/entities/flashsale.entity';

@Controller('item-flashsales')
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

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateItemFlashsaleDto: UpdateItemFlashsaleDto,
  ) {
    return this.itemFlashsalesService.update(id, updateItemFlashsaleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemFlashsalesService.remove(id);
  }
}
