import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { NestjsFormDataModule } from 'nestjs-form-data';

const mockId = '589b7a93-3026-47f8-bbc0-71b91dfd3eb0';

const mockOrderDService = {
  findOne: jest.fn(),
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('OrderDetailController', () => {
  let orderController: OrderController;
  let orderService: OrderService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [NestjsFormDataModule],
      controllers: [OrderController],
      providers: [OrderService],
    })
      .overrideProvider(OrderService)
      .useValue(mockOrderDService)
      .compile();
    orderController = module.get<OrderController>(OrderController);
    orderService = module.get<OrderService>(OrderService);
  });

  describe('getById', () => {
    it('service should be called', async () => {
      const spy = jest.spyOn(orderService, 'findOne');
      await orderController.findOne(mockId);
      expect(spy).toBeCalled();
    });
  });
  describe('getAll', () => {
    it('service should be called', async () => {
      const spy = jest.spyOn(orderService, 'findAll');
      await orderController.findAll({ full_name: 'testttt' });
      expect(spy).toBeCalled();
    });
  });
  describe('remove', () => {
    it('service should be called', async () => {
      const spy = jest.spyOn(orderService, 'remove');
      await orderController.remove(mockId);
      expect(spy).toBeCalled();
    });
  });
  describe('create', () => {
    it('service should be called', async () => {
      const spy = jest.spyOn(orderService, 'create');
      await orderController.create(
        { full_name: 'testttt' },
        { full_name: 'testttt' },
      );
      expect(spy).toBeCalled();
    });
  });
  describe('update', () => {
    it('service should be called', async () => {
      const spy = jest.spyOn(orderService, 'update');
      await orderController.update(
        { full_name: 'testttt', address: 'test', phone_number: 123 },
        mockId,
      );
      expect(spy).toBeCalled();
    });
  });
});
