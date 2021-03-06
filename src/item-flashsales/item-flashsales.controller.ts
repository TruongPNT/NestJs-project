import { Controller, Get, Param, UseFilters, UseGuards } from '@nestjs/common';
import { ItemFlashsalesService } from './item-flashsales.service';
import { HttpExceptionFilter } from '../filter/http-exception.filter';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('item-flashsales')
@ApiTags('Item-flashsales')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@UseFilters(HttpExceptionFilter)
export class ItemFlashsalesController {
  constructor(private readonly itemFlashsalesService: ItemFlashsalesService) {}

  // @Post()
  // create(
  //   @Body() createItemFlashsaleDto: CreateItemFlashsaleDto,
  //   flashsale: Flashsale,
  // ) {
  //   return this.itemFlashsalesService.create(createItemFlashsaleDto, flashsale);
  // }

  @Get()
  findAll() {
    return this.itemFlashsalesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemFlashsalesService.findOne(id);
  }

  //   @Delete(':id')
  //   remove(@Param('id') id: string) {
  //     return this.itemFlashsalesService.remove(id);
  //   }
}
