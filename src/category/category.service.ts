import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(public readonly categoryRepository: CategoryRepository) {}
  create(createCategoryDto: CreateCategoryDto, file: Express.Multer.File) {
    return this.categoryRepository.createCategory(createCategoryDto, file);
  }

  findAll() {
    return this.categoryRepository.find({ where: { status: true } });
  }

  findOne(id: string) {
    return this.categoryRepository.findOne({
      relations: ['products'],
      where: { id },
    });
  }

  update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
    file: Express.Multer.File,
  ) {
    return this.categoryRepository.updateCategory(updateCategoryDto, file, id);
  }

  remove(id: string) {
    return this.categoryRepository.destroyCategory(id);
  }
}
