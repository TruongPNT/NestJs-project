import { TypeOrmModule } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { VoucherController } from './voucher.controller';
import { VoucherService } from './voucher.service';
import { VoucherRepository } from './voucher.repository';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { TypeOrmSQLITETestingModule } from '../../test/testDataset.seed';

const mockId = '589b7a93-3026-47f8-bbc0-71b91dfd3eb0';

const mockVoucherService = {
  findOne: jest.fn(),
  findAll: jest.fn(),
  remove: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
};

describe.skip('VoucherController', () => {
  let voucherController: VoucherController;
  let voucherService: VoucherService;
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        ...TypeOrmSQLITETestingModule(),
        TypeOrmModule.forFeature([VoucherRepository]),
        NestjsFormDataModule,
      ],
      controllers: [VoucherController],
      providers: [VoucherService],
    })
      .overrideProvider(VoucherService)
      .useValue(mockVoucherService)
      .compile();
    voucherController = module.get<VoucherController>(VoucherController);
    voucherService = module.get<VoucherService>(VoucherService);
  });

  afterAll(async () => {
    await module.close();
  });

  describe('getById', () => {
    it('service should be called', async () => {
      const spy = jest.spyOn(voucherService, 'findOne');
      await voucherController.findOne(mockId);
      expect(spy).toBeCalled();
    });
  });

  describe('getAll', () => {
    it('service should be called', async () => {
      const spy = jest.spyOn(voucherService, 'findAll');
      await voucherController.findAll();
      expect(spy).toBeCalled();
    });
  });
  describe('remove', () => {
    it('service should be called', async () => {
      const spy = jest.spyOn(voucherService, 'remove');
      await voucherController.remove(mockId);
      expect(spy).toBeCalled();
    });
  });
  describe('create', () => {
    it('service should be called', async () => {
      const spy = await jest.spyOn(voucherService, 'create');
      await voucherController.create({});
      expect(spy).toBeCalled();
    });
  });
  describe('update', () => {
    it('service should be called', async () => {
      const spy = jest.spyOn(voucherService, 'update');
      await voucherController.update(mockId, {});
      expect(spy).toBeCalled();
    });
  });
});
