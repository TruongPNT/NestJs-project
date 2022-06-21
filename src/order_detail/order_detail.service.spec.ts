import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetailRepository } from './order_detail.repository';
import { OrderDetailService } from './order_detail.service';
import { NestjsFormDataModule } from 'nestjs-form-data';

import { TypeOrmSQLITETestingModule } from '../../test/testDataset.seed';
import { ProductModule } from '../product/product.module';
import { ItemFlashsalesModule } from '../item-flashsales/item-flashsales.module';

const voucherData = {};
const mockId = '589b7a93-3026-47f8-bbc0-71b91dfd3eb0';
describe('OrderDetailService', () => {
  let orderDetailService: OrderDetailService;
  let module: TestingModule;
  let orderDetailRepository;

  const mockOrderDetailRepository = {};

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        ...TypeOrmSQLITETestingModule(),
        TypeOrmModule.forFeature([OrderDetailRepository]),
        NestjsFormDataModule,
        ProductModule,
        ItemFlashsalesModule,
      ],
      providers: [OrderDetailService],
    })
      .overrideProvider(getRepositoryToken(OrderDetailRepository))
      .useValue(mockOrderDetailRepository)
      .compile();
    orderDetailRepository = await module.resolve<OrderDetailRepository>(
      OrderDetailRepository,
    );
    orderDetailService = module.get<OrderDetailService>(OrderDetailService);
  });

  describe('findAll order_detail', () => {
    it('should return an array of order_detail', async () => {
      const order_detail = await orderDetailService.findAll();
      expect(order_detail).toBeTruthy();
    });
  });
  afterAll(async () => {
    await module.close();
  });
});
