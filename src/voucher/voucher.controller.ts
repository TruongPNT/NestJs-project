import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { HttpExceptionFilter } from '../filter/http-exception.filter';
import { FormDataRequest } from 'nestjs-form-data';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../authorization/roles.decorator';
import { UserRole } from '../user/dto/user-roles.enum';

@Controller('voucher')
@ApiTags('Voucher')
@ApiBearerAuth()
@UseFilters(HttpExceptionFilter)
@UseGuards(AuthGuard('jwt'))
export class VoucherController {
  constructor(private readonly voucherService: VoucherService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @FormDataRequest()
  create(@Body() createVoucherDto: CreateVoucherDto) {
    return this.voucherService.create(createVoucherDto);
  }

  @Get()
  findAll() {
    return this.voucherService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.voucherService.findOne(id);
  }

  @Patch(':id')
  @FormDataRequest()
  @Roles(UserRole.ADMIN)
  update(@Param('id') id: string, @Body() updateVoucherDto: UpdateVoucherDto) {
    return this.voucherService.update(id, updateVoucherDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.voucherService.remove(id);
  }
}
