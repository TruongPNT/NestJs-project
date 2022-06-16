import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';
import { EntityRepository, Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UpdateCategoryDto } from './dto/update-category.dto';
import * as fs from 'fs';
@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  async createCategory(
    createCategoryDto: CreateCategoryDto,
    file: Express.Multer.File,
  ) {
    try {
      const path = file.path;
      const { index, name } = createCategoryDto;
      const category = await this.create({
        banner: path,
        index,
        name,
      });
      if (category) await this.save(category);
      return { code: 200, message: 'Category created successfully', category };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  async updateCategory(
    updateCategoryDto: UpdateCategoryDto,
    file: Express.Multer.File,
    id: string,
  ) {
    try {
      const category = await this.findOne(id);
      if (!category) throw new NotFoundException('Category not found');
      if (file) {
        if (fs.existsSync(category.banner)) {
          fs.unlinkSync(`./${category.banner}`);
        }
        category.banner = file.path;
      }
      const { name, index } = updateCategoryDto;
      category.name = name;
      category.index = index;
      const result = await this.save(category);
      if (result) return { code: 200, message: 'Update category successful' };
    } catch (error) {
      throw new BadRequestException('Sever error');
    }
  }
  async destroyCategory(id: string) {
    try {
      const category = await this.findOne(id);
      if (!category) throw new NotFoundException('Category not found');
      const result = await this.softRemove(category);
      if (result) return { code: 200, message: 'Delete category successful' };
    } catch (error) {
      throw new BadRequestException('Sever error');
    }
  }
}
