import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';

const productData = {
  name: 'iphone 7',
  import_price: 6000000,
  sell_price: 7000000,
  quantity: 100,
  description: 'Điện thoại Iphone 7',
};

const mockId = '589b7a93-3026-47f8-bbc0-71b91dfd3eb0';

const productArray = [productData, productData, productData];

describe('ProductService', () => {
  let productService: ProductService;
  const mockProductRegistry = {
    createProduct: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockImplementation((dto) => Promise.resolve({ ...dto })),
    findAll: jest.fn().mockResolvedValue(productArray),
    findOne: jest.fn().mockImplementation((id: string) =>
      Promise.resolve({
        name: 'iphone 7',
        import_price: 6000000,
        sell_price: 7000000,
        quantity: 100,
        description: 'Điện thoại Iphone 7',
        id,
      }),
    ),
    update: jest
      .fn()
      .mockImplementation((id: string, dto) => Promise.resolve({ ...dto })),
    remove: jest
      .fn()
      .mockResolvedValue({ code: 200, message: 'Delete product successful' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService],
    })
      .overrideProvider(ProductService)
      .useValue(mockProductRegistry)
      .compile();
    productService = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(productService).toBeDefined();
  });

  describe('get list of Product', () => {
    it('should return an array of product', async () => {
      const spy = jest.spyOn(productService, 'findAll');
      const products = await productService.findAll();
      expect(spy).toBeCalled();
      expect(products).toEqual(productArray);
    });
  });

  describe('get one Product', () => {
    it('should return a product', async () => {
      const spy = jest.spyOn(productService, 'findOne');
      const product = await productService.findOne('a uuid');
      expect(spy).toBeCalled();
      expect(product).toEqual({
        name: 'iphone 7',
        import_price: 6000000,
        sell_price: 7000000,
        quantity: 100,
        description: 'Điện thoại Iphone 7',
        id: 'a uuid',
      });
    });
  });

  describe('create Product', () => {
    it('should create a product record and return it', async () => {
      const spy = jest.spyOn(productService, 'createProduct');
      const product = await productService.createProduct({ name: 'iPhone8' });
      expect(spy).toBeCalled();
      expect(product).toEqual({ name: 'iPhone8' });
    });
  });
  describe('update product', () => {
    it('should call the update method', async () => {
      const product = await productService.update('a uuid', {
        name: 'iphone 7',
        import_price: 6000000,
        sell_price: 7000000,
        quantity: 100,
        description: 'Điện thoại Iphone 7',
      });
      expect(product).toEqual(productData);
    });
  });

  describe('delete product', () => {
    it('should call the delete method', async () => {
      const product = await productService.remove('a uuid');
      expect(product).toEqual({
        code: 200,
        message: 'Delete product successful',
      });
    });
  });
});
