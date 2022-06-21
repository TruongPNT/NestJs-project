import { Test, TestingModule } from '@nestjs/testing';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { FlashsalesController } from './flashsales.controller';
import { FlashsalesService } from './flashsales.service';

const mockId = '589b7a93-3026-47f8-bbc0-71b91dfd3eb0';
const FlashsaleData = {
  name: 'Test',
  description: 'Test',
};
const mockFlashSaleService = {
  findOne: jest.fn(),
  findAll: jest.fn(),
  remove: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
};

describe('FlashSaleController', () => {
  let flashsalesController: FlashsalesController;
  let flashsalesService: FlashsalesService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [NestjsFormDataModule],
      controllers: [FlashsalesController],
      providers: [FlashsalesService],
    })
      .overrideProvider(FlashsalesService)
      .useValue(mockFlashSaleService)
      .compile();
    flashsalesController =
      module.get<FlashsalesController>(FlashsalesController);
    flashsalesService = module.get<FlashsalesService>(FlashsalesService);
  });

  describe('getById', () => {
    it('service should be called', async () => {
      const spy = jest.spyOn(flashsalesService, 'findOne');
      await flashsalesController.findOne(mockId);
      expect(spy).toBeCalled();
    });
  });
  describe('getAll', () => {
    it('service should be called', async () => {
      const spy = jest.spyOn(flashsalesService, 'findAll');
      await flashsalesController.findAll();
      expect(spy).toBeCalled();
    });
  });
  describe('remove', () => {
    it('service should be called', async () => {
      const spy = jest.spyOn(flashsalesService, 'remove');
      await flashsalesController.remove(mockId);
      expect(spy).toBeCalled();
    });
  });
  describe('create', () => {
    it('service should be called', async () => {
      const spy = jest.spyOn(flashsalesService, 'create');
      await flashsalesController.create(FlashsaleData);
      expect(spy).toBeCalled();
    });
  });
  describe('update', () => {
    it('service should be called', async () => {
      const spy = jest.spyOn(flashsalesService, 'update');
      await flashsalesController.update(mockId, FlashsaleData);
      expect(spy).toBeCalled();
    });
  });
});
