import { TypeOrmModule } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { OrderDetailController } from './order_detail.controller';
import { OrderDetailService } from './order_detail.service';
import { OrderDetailRepository } from './order_detail.repository';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { TypeOrmSQLITETestingModule } from '../../test/testDataset.seed';

const mockId = '589b7a93-3026-47f8-bbc0-71b91dfd3eb0';

const mockOrderDService = {
  findOne: jest.fn(),
  findAll: jest.fn(),
};

describe.skip('OrderDetailController', () => {
  let orderDetailController: OrderDetailController;
  let orderDetailService: OrderDetailService;
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        ...TypeOrmSQLITETestingModule(),
        TypeOrmModule.forFeature([OrderDetailRepository]),
        NestjsFormDataModule,
      ],
      controllers: [OrderDetailController],
      providers: [OrderDetailService],
    })
      .overrideProvider(OrderDetailService)
      .useValue(mockOrderDService)
      .compile();
    orderDetailController = module.get<OrderDetailController>(
      OrderDetailController,
    );
    orderDetailService = module.get<OrderDetailService>(OrderDetailService);
  });

  afterAll(async () => {
    await module.close();
  });

  describe('getById', () => {
    it('service should be called', async () => {
      const spy = jest.spyOn(orderDetailService, 'findOne');
      await orderDetailController.findOne(mockId);
      expect(spy).toBeCalled();
    });
  });

  describe('getAll', () => {
    it('service should be called', async () => {
      const spy = jest.spyOn(orderDetailService, 'findAll');
      await orderDetailController.findAll();
      expect(spy).toBeCalled();
    });
  });
});
