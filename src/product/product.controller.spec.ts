import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

const productData = {
  name: 'iphone 7',
  import_price: 6000000,
  sell_price: 7000000,
  quantity: 100,
  description: 'Điện thoại Iphone 7',
};

const mockId = '589b7a93-3026-47f8-bbc0-71b91dfd3eb0';

const mockProductService = {
  findOne: jest.fn().mockImplementation((id: string) =>
    Promise.resolve({
      name: 'test product',
      barcode: 'AAAAAA',
      id,
    }),
  ),
  findAll: jest.fn().mockImplementation(() => Promise.resolve([])),
  remove: jest.fn().mockResolvedValue({ deleted: true }),
  createProduct: jest
    .fn()
    .mockImplementation((productData) => Promise.resolve([productData])),
  update: jest.fn(),
};

describe.skip('ProductController', () => {
  let productController: ProductController;
  let productService: ProductService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService],
    })
      .overrideProvider(ProductService)
      .useValue(mockProductService)
      .compile();
    productController = module.get<ProductController>(ProductController);
    productService = module.get<ProductService>(ProductService);
  });

  describe('getById', () => {
    it('service should be called', async () => {
      const spy = jest.spyOn(productService, 'findOne');
      await productController.findOne(mockId);
      expect(spy).toBeCalled();
    });
  });
  describe('getAll', () => {
    it('service should be called', async () => {
      const spy = jest.spyOn(productService, 'findAll');
      await productController.findAll();
      expect(spy).toBeCalled();
    });
  });
  describe('remove', () => {
    it('service should be called', async () => {
      const spy = jest.spyOn(productService, 'remove');
      await productController.remove(mockId);
      expect(spy).toBeCalled();
    });
  });
  describe('create', () => {
    it('service should be called', async () => {
      const spy = jest.spyOn(productService, 'createProduct');
      await productController.create(productData);
      expect(spy).toBeCalled();
    });
  });
  describe('update', () => {
    it('service should be called', async () => {
      const spy = jest.spyOn(productService, 'update');
      await productController.update(mockId, productData);
      expect(spy).toBeCalled();
    });
  });
});
