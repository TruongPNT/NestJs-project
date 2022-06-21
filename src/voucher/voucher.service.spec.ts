import { CategoryModule } from './../category/category.module';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { VoucherRepository } from './voucher.repository';
import { VoucherService } from './voucher.service';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { Voucher } from './entities/voucher.entity';
import { TypeOrmSQLITETestingModule } from '../../test/testDataset.seed';
import { VoucherType } from './entities/voucher.entity';
const voucherData = {
  code: 'Test',
  note: 'test',
  discount: 30,
  unit: VoucherType.PERCENT,
  quantity: 10,
  startTime: new Date(),
  endTime: new Date(Date.now() + 60 * 60 * 1000),
};
let voucherCreate;
const mockId = '589b7a93-3026-47f8-bbc0-71b91dfd3eb0';
describe('ProductService', () => {
  let voucherService: VoucherService;
  let module: TestingModule;
  let voucherRepository;

  const mockProductRepository = {};

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        ...TypeOrmSQLITETestingModule(),
        TypeOrmModule.forFeature([VoucherRepository]),
        NestjsFormDataModule,
        CategoryModule,
      ],
      providers: [VoucherService],
    })
      .overrideProvider(getRepositoryToken(Voucher))
      .useValue(mockProductRepository)
      .compile();
    voucherRepository = await module.resolve<VoucherRepository>(
      VoucherRepository,
    );
    voucherService = module.get<VoucherService>(VoucherService);
  });

  it('should be defined', () => {
    expect(voucherService).toBeDefined();
  });

  describe('create voucher', () => {
    it('should return a voucher after create', async () => {
      const result = await voucherService.create(voucherData);
      voucherCreate = result.voucher;
      expect(result.code).toBe(200);
      expect(result.voucher.code).toBe(voucherData.code);
    });
    it('should return a error when startTime less than time now', async () => {
      try {
        await voucherService.create({
          code: 'Test',
          note: 'test',
          discount: 30,
          unit: VoucherType.PERCENT,
          quantity: 10,
          startTime: new Date(Date.now() - 15 * 60 * 1000),
          endTime: new Date(Date.now() + 60 * 60 * 1000),
        });
      } catch (error) {
        expect(error.status).toBe(400);
        expect(error.message).toBe(
          'Thời điểm bắt đầu không thể nhỏ hơn hiện tại',
        );
      }
    });
    it('should return a error when endTime less than startTime', async () => {
      try {
        await voucherService.create({
          code: 'Test',
          note: 'test',
          discount: 30,
          unit: VoucherType.PERCENT,
          quantity: 10,
          startTime: new Date(Date.now()),
          endTime: new Date(Date.now() - 10 * 60 * 1000),
        });
      } catch (error) {
        expect(error.status).toBe(400);
        expect(error.message).toBe(
          'Thời điểm kết thúc không thể nhỏ hơn thời điểm bắt đầu',
        );
      }
    });
  });
  describe('findAll voucher', () => {
    it('should return an array of voucher', async () => {
      const voucher = await voucherService.findAll();
      expect(voucher).toBeTruthy();
    });
  });
  describe('findOne voucher', () => {
    it('should return a voucher', async () => {
      const result = await voucherService.findOne(voucherCreate.id);

      expect(result.id).toBe(voucherCreate.id);
      expect(result.code).toBe(voucherCreate.code);
    });
    it('should return an error when voucher not found', async () => {
      try {
        await voucherService.findOne(mockId);
      } catch (error) {
        expect(error.status).toEqual(404);
        expect(error.message).toBe('Voucher not found');
      }
    });
  });
  describe('update voucher', () => {
    it('should return a voucher after create', async () => {
      const result = await voucherService.update(voucherCreate.id, {
        code: 'Testsasdasdasd',
      });
      expect(result.code).toEqual(200);
      expect(result.message).toBe('Update voucher successful');
      expect(result.result.code).toBe('Testsasdasdasd');
    });
    it('should return an error', async () => {
      try {
        await voucherService.update(voucherCreate.id, {
          startTime: new Date(Date.now() - 15 * 60 * 1000),
          endTime: new Date(Date.now() + 60 * 60 * 1000),
        });
      } catch (error) {
        expect(error.status).toEqual(409);
        expect(error.message).toEqual(
          'Thời điểm bắt đầu không được nhỏ hơn hiện tại',
        );
      }
    });
    it('should return an error', async () => {
      try {
        await voucherService.update(voucherCreate.id, {
          startTime: new Date(Date.now()),
          endTime: new Date(Date.now() - 15 * 60 * 1000),
        });
      } catch (error) {
        expect(error.status).toEqual(409);
        expect(error.message).toEqual(
          'Thời điểm kết thúc không được nhỏ hơn thời điểm bắt đầu',
        );
      }
    });
    it('should return an error', async () => {
      try {
        await voucherService.update(voucherCreate.id, {
          startTime: new Date(Date.now() - 15 * 60 * 1000),
        });
      } catch (error) {
        expect(error.status).toEqual(409);
        expect(error.message).toEqual(
          'Thời điểm bắt đầu không được nhỏ hơn hiện tại',
        );
      }
    });
    it('should return an error', async () => {
      try {
        await voucherService.update(voucherCreate.id, {
          startTime: new Date(Date.now() + 70 * 60 * 1000),
        });
      } catch (error) {
        expect(error.status).toEqual(409);
        expect(error.message).toEqual(
          'Thời điểm bắt đầu không được vượt quá thời điểm kết thúc',
        );
      }
    });
    it('should return an error', async () => {
      try {
        await voucherService.update(voucherCreate.id, {
          endTime: new Date(Date.now() - 10 * 60 * 1000),
        });
      } catch (error) {
        expect(error.status).toEqual(409);
        expect(error.message).toEqual('Thời điểm kết thúc không hợp lệ');
      }
    });
  });
  describe('delete voucher', () => {
    it('should return a message when delete successfully', async () => {
      const result = await voucherService.remove(voucherCreate.id);
      expect(result.code).toEqual(200);
      expect(result.message).toBe('voucher delete successful');
    });
    it('should return an error', async () => {
      try {
        await voucherService.remove(mockId);
      } catch (error) {
        expect(error.status).toEqual(404);
        expect(error.message).toBe('Voucher not found');
      }
    });
  });
  afterAll(async () => {
    await module.close();
  });
});
