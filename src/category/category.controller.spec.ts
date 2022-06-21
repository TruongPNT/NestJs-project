import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

const mockId = '589b7a93-3026-47f8-bbc0-71b91dfd3eb0';
const CategoryData = {
  name: 'Test',
  index: 0,
};
const mockCategoryService = {
  findOne: jest.fn(),
  findAll: jest.fn(),
  remove: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
};

describe('CategoryController', () => {
  let categoryController: CategoryController;
  let categoryService: CategoryService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [CategoryService],
    })
      .overrideProvider(CategoryService)
      .useValue(mockCategoryService)
      .compile();
    categoryController = module.get<CategoryController>(CategoryController);
    categoryService = module.get<CategoryService>(CategoryService);
  });

  describe('getById', () => {
    it('service should be called', async () => {
      const spy = jest.spyOn(categoryService, 'findOne');
      await categoryController.findOne(mockId);
      expect(spy).toBeCalled();
    });
  });
  describe('getAll', () => {
    it('service should be called', async () => {
      const spy = jest.spyOn(categoryService, 'findAll');
      await categoryController.findAll();
      expect(spy).toBeCalled();
    });
  });
  describe('remove', () => {
    it('service should be called', async () => {
      const spy = jest.spyOn(categoryService, 'remove');
      await categoryController.remove(mockId);
      expect(spy).toBeCalled();
    });
  });
  describe('create', () => {
    it('service should be called', async () => {
      const spy = jest.spyOn(categoryService, 'create');
      await categoryController.create(CategoryData);
      expect(spy).toBeCalled();
    });
  });
  describe('update', () => {
    it('service should be called', async () => {
      const spy = jest.spyOn(categoryService, 'update');
      await categoryController.update(mockId, CategoryData);
      expect(spy).toBeCalled();
    });
  });
});
