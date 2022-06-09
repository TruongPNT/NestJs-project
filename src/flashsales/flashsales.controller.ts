import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseFilters,
} from '@nestjs/common';
import { FlashsalesService } from './flashsales.service';
import { CreateFlashsaleDto } from './dto/create-flashsale.dto';
import { UpdateFlashsaleDto } from './dto/update-flashsale.dto';
import { FormDataRequest } from 'nestjs-form-data';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/filter/http-exception.filter';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/authorization/roles.decorator';
import { UserRole } from 'src/user/dto/user-roles.enum';

@Controller('flashsales')
@ApiTags('Flashsales')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@UseFilters(HttpExceptionFilter)
export class FlashsalesController {
  constructor(private readonly flashsalesService: FlashsalesService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @FormDataRequest()
  create(@Body() createFlashsaleDto: CreateFlashsaleDto) {
    return this.flashsalesService.create(createFlashsaleDto);
  }

  @Get()
  findAll() {
    return this.flashsalesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.flashsalesService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  @FormDataRequest()
  update(
    @Param('id') id: string,
    @Body() updateFlashsaleDto: UpdateFlashsaleDto,
  ) {
    return this.flashsalesService.update(id, updateFlashsaleDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.flashsalesService.remove(id);
  }
}
