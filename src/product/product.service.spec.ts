import { CategoryModule } from './../category/category.module';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { ProductsRepository } from './product.repository';
import { ProductService } from './product.service';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { Product } from './entities/product.entity';
import { TypeOrmSQLITETestingModule } from '../../test/testDataset.seed';

const productData = {
  name: 'iphone 7',
  import_price: 6000000,
  sell_price: 7000000,
  quantity: 100,
  description: 'Điện thoại Iphone 7',
  categoryId: '55a81b6f-e940-4f13-8c9b-1e24c4b44309',
};
const mockId = '589b7a93-3026-47f8-bbc0-71b91dfd3eb0';
describe.skip('ProductService', () => {
  let productService: ProductService;
  let module: TestingModule;
  let productRepository;
  let productId;
  const mockProductRepository = {};

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        ...TypeOrmSQLITETestingModule(),
        TypeOrmModule.forFeature([ProductsRepository]),
        NestjsFormDataModule,
        CategoryModule,
      ],
      providers: [ProductService],
    })
      .overrideProvider(getRepositoryToken(Product))
      .useValue(mockProductRepository)
      .compile();
    productRepository = await module.resolve<ProductsRepository>(
      ProductsRepository,
    );
    productService = module.get<ProductService>(ProductService);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(productService).toBeDefined();
  });

  describe('create product', () => {
    it('should return a product after create', async () => {
      const product = await productService.createProduct(productData);
      productId = product.data.id;
      expect(product.code).toBe(200);
      expect(product.data.name).toBe(productData.name);
    });
    it('should return an error when category not found', async () => {
      try {
        await productService.createProduct({
          name: 'iphone 7',
          import_price: 6000000,
          sell_price: 7000000,
          quantity: 100,
          description: 'Điện thoại Iphone 7',
          categoryId: mockId,
        });
      } catch (e) {
        expect(e.message).toBe('Category not found');
        expect(e.status).toEqual(404);
      }
    });
    it('should return an error when do not have categoryID', async () => {
      try {
        await productService.createProduct({
          name: 'iphone 7',
          import_price: 6000000,
          sell_price: 7000000,
          quantity: 100,
          description: 'Điện thoại Iphone 7',
        });
      } catch (e) {
        expect(e.message).toBe('Category không được để trống');
        expect(e.status).toEqual(409);
      }
    });
  });
  describe('get list of Product', () => {
    it('should return an array of product', async () => {
      const products = await productService.findAll();
      expect(products).toBeTruthy();
    });
  });
  describe('get a Product', () => {
    it('should return a product', async () => {
      const products = await productService.findOne(productId);
      expect(products.id).toBe(productId);
    });
    it('should return an error when product not found', async () => {
      try {
        await productService.findOne(mockId);
      } catch (error) {
        expect(error.message).toBe('Product not found');
        expect(error.status).toEqual(404);
      }
    });
  });
  describe('update product', () => {
    it('should return a product after update', async () => {
      const productUpdate = await productService.update(productId, {
        name: 'test123',
      });
      expect(productUpdate.code).toBe(200);
      expect(productUpdate.data.name).toBe('test123');
      expect(productUpdate.message).toBe('Update product successful');
    });
    it('should return an error when product not found', async () => {
      try {
        await productService.update(mockId, {
          name: 'test123',
        });
      } catch (error) {
        expect(error.message).toBe('Product not found');
        expect(error.status).toEqual(404);
      }
    });
  });
  describe('get product sale and update sale status for product', () => {
    it('should return a message success', async () => {
      await productService.getItemWithFlashsale(productId);
      expect(productService.getItemWithFlashsale).toBeCalled;
    });
    it('should return a message success', async () => {
      await productService.updateIsSaleTrue(productId);
      expect(productService.updateIsSaleTrue).toBeCalled;
    });
    it('should update sale status for product', async () => {
      try {
        await productService.updateIsSaleTrue(mockId);
      } catch (error) {
        expect(error.message).toBe('Product not found');
        expect(error.status).toEqual(404);
      }
    });
    it('should return a message success', async () => {
      await productService.updateIsSaleFalse(productId);
      expect(productService.updateIsSaleFalse).toBeCalled;
    });
    it('should update sale status for product', async () => {
      try {
        await productService.updateIsSaleFalse(mockId);
      } catch (error) {
        expect(error.message).toBe('Product not found');
        expect(error.status).toEqual(404);
      }
    });
  });
  describe('delete product', () => {
    it('should return a message success', async () => {
      const product = await productService.remove(productId);
      expect(product.code).toBe(200);
      expect(product.message).toBe('Delete product successful');
    });
    it('should return an error when product not found', async () => {
      try {
        await productService.remove(productId);
      } catch (error) {
        expect(error.message).toBe('Product not found');
        expect(error.status).toEqual(404);
      }
    });
  });
});
