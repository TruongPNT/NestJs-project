import { ProductsRepository } from 'src/product/product.repository';
import { CategoryService } from 'src/category/category.service';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';

describe('ProductController', () => {
  let productController: ProductController;
  let productService: ProductService;
  let categoryService: CategoryService;
  let productRepository: ProductsRepository;

  beforeEach(() => {
    productService = new ProductService(productRepository, categoryService);
    productController = new ProductController(productService);
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const result = Product['test'];
      jest.spyOn(productService, 'findAll').mockImplementation(() => result);

      expect(await productController.findAll()).toBe(result);
    });
  });
});
