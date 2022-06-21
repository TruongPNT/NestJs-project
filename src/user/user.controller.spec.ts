import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UsersRepository } from './user.repository';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { User } from './entities/user.entity';
import { TypeOrmSQLITETestingModule } from '../../test/testDataset.seed';

const userData = {
  full_name: 'Test',
  age: 12,
  address: 'Test',
  email: 'Test@gmail.com',
  password: 'TestPassword',
};

const mockId = '589b7a93-3026-47f8-bbc0-71b91dfd3eb0';

const mockUserService = {
  findOne: jest.fn(),
  findAll: jest.fn(),
  remove: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  findOneForUser: jest.fn(),
  updateForUser: jest.fn(),
};

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [NestjsFormDataModule],
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();
    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  describe('getById', () => {
    it('service should be called', async () => {
      const spy = jest.spyOn(userService, 'findOne');
      await userController.findOne(mockId);
      expect(spy).toBeCalled();
    });
  });

  describe('getById', () => {
    it('service should be called', async () => {
      const spy = jest.spyOn(userService, 'findOneForUser');
      await userController.findOneForUser(mockId);
      expect(spy).toBeCalled();
    });
  });

  describe('getAll', () => {
    it('service should be called', async () => {
      const spy = jest.spyOn(userService, 'findAll');
      await userController.findAll();
      expect(spy).toBeCalled();
    });
  });
  describe('remove', () => {
    it('service should be called', async () => {
      const spy = jest.spyOn(userService, 'remove');
      await userController.remove(mockId);
      expect(spy).toBeCalled();
    });
  });
  describe('create', () => {
    it('service should be called', async () => {
      const spy = await jest.spyOn(userService, 'create');
      await userController.create(userData);
      expect(spy).toBeCalled();
    });
  });
  describe('update', () => {
    it('service should be called', async () => {
      const spy = jest.spyOn(userService, 'update');
      await userController.update(mockId, userData);
      expect(spy).toBeCalled();
    });
  });
  describe('update', () => {
    it('service should be called', async () => {
      const spy = jest.spyOn(userService, 'updateForUser');
      await userController.updateForUser(userData, userData);
      expect(spy).toBeCalled();
    });
  });
});
