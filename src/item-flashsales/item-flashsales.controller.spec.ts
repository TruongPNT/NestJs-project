import { Test, TestingModule } from '@nestjs/testing';
import { ItemFlashsalesController } from './item-flashsales.controller';
import { ItemFlashsalesService } from './item-flashsales.service';
import { NestjsFormDataModule } from 'nestjs-form-data';

const mockId = '589b7a93-3026-47f8-bbc0-71b91dfd3eb0';

const mockItemFlashSalesDService = {
  findOne: jest.fn(),
  findAll: jest.fn(),
};

describe('ItemFlashSalesDetailController', () => {
  let itemFlashsalesController: ItemFlashsalesController;
  let itemFlashsalesService: ItemFlashsalesService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [NestjsFormDataModule],
      controllers: [ItemFlashsalesController],
      providers: [ItemFlashsalesService],
    })
      .overrideProvider(ItemFlashsalesService)
      .useValue(mockItemFlashSalesDService)
      .compile();
    itemFlashsalesController = module.get<ItemFlashsalesController>(
      ItemFlashsalesController,
    );
    itemFlashsalesService = module.get<ItemFlashsalesService>(
      ItemFlashsalesService,
    );
  });

  describe('getById', () => {
    it('service should be called', async () => {
      const spy = jest.spyOn(itemFlashsalesService, 'findOne');
      await itemFlashsalesController.findOne(mockId);
      expect(spy).toBeCalled();
    });
  });

  describe('getAll', () => {
    it('service should be called', async () => {
      const spy = jest.spyOn(itemFlashsalesService, 'findAll');
      await itemFlashsalesController.findAll();
      expect(spy).toBeCalled();
    });
  });
});
