import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductService } from 'src/product/product.service';
import { CreateImgDetailDto } from './dto/create-img-detail.dto';
import { UpdateImgDetailDto } from './dto/update-img-detail.dto';
import { ImgDetailsRepository } from './img-detail.repository';

@Injectable()
export class ImgDetailService {
  constructor(
    private imgdetailRepository: ImgDetailsRepository,
    private productService: ProductService,
  ) {}
  async create(
    createImgDetailDto: CreateImgDetailDto,
    file: Express.Multer.File,
  ) {
    try {
      const path = file.path;
      const { product_id, index } = createImgDetailDto;
      const product = await this.productService.findOne(product_id);
      if (product) {
        const imgdetail = await this.imgdetailRepository.create({
          index: index,
          product: product,
          img_detail: path,
        });
        const result = await this.imgdetailRepository.save(imgdetail);
        if (result) return { code: 200, message: 'Create imgDetail success' };
      }
    } catch (error) {
      throw new BadRequestException('Sever error');
    }
  }

  findAll() {
    return this.imgdetailRepository.find();
  }

  findOne(id: string) {
    return this.imgdetailRepository.find({
      relations: ['product'],
      where: { id },
    });
  }

  update(
    id: string,
    updateImgDetailDto: UpdateImgDetailDto,
    file: Express.Multer.File,
  ) {
    return this.imgdetailRepository.updateImg(id, updateImgDetailDto, file);
  }

  remove(id: string) {
    return this.imgdetailRepository.destroyImgDetail(id);
  }
}
