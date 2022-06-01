import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ImgDetailService } from './img-detail.service';
import { CreateImgDetailDto } from './dto/create-img-detail.dto';
import { UpdateImgDetailDto } from './dto/update-img-detail.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { HttpExceptionFilter } from 'src/filter/http-exception.filter';
import { AuthGuard } from '@nestjs/passport';

@Controller('img-detail')
@UseFilters(HttpExceptionFilter)
@UseGuards(AuthGuard('jwt'))
export class ImgDetailController {
  constructor(private readonly imgDetailService: ImgDetailService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('img_detail', {
      storage: diskStorage({
        destination: './uploads/img-detail',
        filename: (req, file, cb) => {
          // Generating a 32 random chars long string
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          //Calling the callback passing the random name generated with the original extension name
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  create(
    @Body() createImgDetailDto: CreateImgDetailDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.imgDetailService.create(createImgDetailDto, file);
  }

  @Get()
  findAll() {
    return this.imgDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imgDetailService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('img_detail', {
      storage: diskStorage({
        destination: './uploads/img-detail',
        filename: (req, file, cb) => {
          // Generating a 32 random chars long string
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          //Calling the callback passing the random name generated with the original extension name
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  update(
    @Param('id') id: string,
    @Body() updateImgDetailDto: UpdateImgDetailDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.imgDetailService.update(id, updateImgDetailDto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imgDetailService.remove(id);
  }
}
