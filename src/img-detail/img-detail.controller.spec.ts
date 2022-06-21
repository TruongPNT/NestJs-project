import { Test, TestingModule } from '@nestjs/testing';
import { ImgDetailController } from './img-detail.controller';
import { ImgDetailService } from './img-detail.service';

const mockId = '589b7a93-3026-47f8-bbc0-71b91dfd3eb0';
const ImgDetailData = {
  index: 1,
  product_id: mockId,
};
const mockImgDetailService = {
  findOne: jest.fn(),
  findAll: jest.fn(),
  remove: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
};

describe('ImgDetailController', () => {
  let imgDetailController: ImgDetailController;
  let imgDetailService: ImgDetailService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImgDetailController],
      providers: [ImgDetailService],
    })
      .overrideProvider(ImgDetailService)
      .useValue(mockImgDetailService)
      .compile();
    imgDetailController = module.get<ImgDetailController>(ImgDetailController);
    imgDetailService = module.get<ImgDetailService>(ImgDetailService);
  });

  describe('getById', () => {
    it('service should be called', async () => {
      const spy = jest.spyOn(imgDetailService, 'findOne');
      await imgDetailController.findOne(mockId);
      expect(spy).toBeCalled();
    });
  });
  describe('getAll', () => {
    it('service should be called', async () => {
      const spy = jest.spyOn(imgDetailService, 'findAll');
      await imgDetailController.findAll();
      expect(spy).toBeCalled();
    });
  });
  describe('remove', () => {
    it('service should be called', async () => {
      const spy = jest.spyOn(imgDetailService, 'remove');
      await imgDetailController.remove(mockId);
      expect(spy).toBeCalled();
    });
  });
  describe('create', () => {
    it('service should be called', async () => {
      const spy = jest.spyOn(imgDetailService, 'create');
      await imgDetailController.create(ImgDetailData);
      expect(spy).toBeCalled();
    });
  });
  describe('update', () => {
    it('service should be called', async () => {
      const spy = jest.spyOn(imgDetailService, 'update');
      await imgDetailController.update(mockId, ImgDetailData);
      expect(spy).toBeCalled();
    });
  });
});
