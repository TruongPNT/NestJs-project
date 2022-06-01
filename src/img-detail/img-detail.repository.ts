import { UpdateImgDetailDto } from './dto/update-img-detail.dto';
import { EntityRepository, Repository } from 'typeorm';
import { ImgDetail } from './entities/img-detail.entity';
import * as fs from 'fs';
import { BadRequestException } from '@nestjs/common';

@EntityRepository(ImgDetail)
export class ImgDetailsRepository extends Repository<ImgDetail> {
  async updateImg(
    id: string,
    updateImgDetailDto: UpdateImgDetailDto,
    file: Express.Multer.File,
  ) {
    try {
      const img = await this.findOne(id);
      if (!img) return { code: 404, message: 'ImgDetail not found' };
      if (file) {
        if (fs.existsSync(img.img_detail)) {
          fs.unlinkSync(`./${img.img_detail}`);
        }
        img.img_detail = file.path;
      }
      const { index } = updateImgDetailDto;
      img.index = index;
      const result = await this.save(img);
      if (result) return { code: 200, message: 'update imgDetail successful' };
    } catch (error) {
      throw new BadRequestException('Sever error');
    }
  }
  async destroyImgDetail(id: string) {
    try {
      const img = await this.findOne(id);
      if (!img) return { code: 404, message: 'ImgDetail not found' };
      const result = await this.softRemove(img);
      if (result) return { code: 200, message: 'ImgDetail delete successful' };
    } catch (error) {
      throw new BadRequestException('Sever error');
    }
  }
}
