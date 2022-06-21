import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './user.repository';
import { UserService } from './user.service';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { User } from './entities/user.entity';
import { TypeOrmSQLITETestingModule } from '../../test/testDataset.seed';

const userData = {
  full_name: 'Test',
  age: 12,
  address: 'Test',
  email: 'Test123@gmail.com',
  password: 'TestPassword',
};

const mockUserRepository = {};
const mockId = '589b7a93-3026-47f8-bbc0-71b91dfd3eb0';
let userCreate;

describe('UserService', () => {
  let userService: UserService;
  let module: TestingModule;
  let usersRepository;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        ...TypeOrmSQLITETestingModule(),
        TypeOrmModule.forFeature([UsersRepository]),
        NestjsFormDataModule,
      ],
      providers: [UserService],
    })
      .overrideProvider(getRepositoryToken(User))
      .useValue(mockUserRepository)
      .compile();
    usersRepository = await module.resolve<UsersRepository>(UsersRepository);
    userService = module.get<UserService>(UserService);
  });

  afterAll(async () => {
    await module.close();
  });

  describe('create user', () => {
    it('should return a user after create', async () => {
      const user = await userService.create(userData);
      userCreate = user.data;
      expect(user.code).toEqual(200);
      expect(user.message).toBe('Create user successful');
      expect(user.data.full_name).toBe(userData.full_name);
    });
    it('should return a error if email exists', async () => {
      try {
        await userService.create(userData);
      } catch (error) {
        expect(error.response.error).toBe('Email already exists');
        expect(error.status).toEqual(400);
      }
    });
  });
  describe('find all user', () => {
    it('should return all users', async () => {
      const users = await userService.findAll();
      expect(users).toBeTruthy();
    });
  });
  describe('find a user', () => {
    it('should return a users', async () => {
      const users = await userService.findOne(userCreate.id);
      expect(users.full_name).toBe(userCreate.full_name);
      expect(users.id).toBe(userCreate.id);
    });
    it('should return a users', async () => {
      const users = await userService.findOneForUser(userCreate);
      expect(users.user.full_name).toBe(userCreate.full_name);
      expect(users.user.id).toBe(userCreate.id);
      expect(users.code).toEqual(200);
    });
  });
  describe('update user', () => {
    it('should return a user after update', async () => {
      const user = await userService.update(userCreate.id, {
        full_name: 'testttt',
      });
      expect(user.code).toEqual(200);
      expect(user.data.full_name).toBe('testttt');
    });
    it('should return a error if user not found', async () => {
      try {
        await userService.update(mockId, { full_name: 'testttt' });
      } catch (error) {
        expect(error.message).toBe('User not found');
        expect(error.status).toBe(404);
      }
    });
  });
  describe('updateForUser', () => {
    it('should return message after verifyEmail success', async () => {
      const user = await userService.updateForUser(
        { full_name: 'testttt' },
        userCreate,
      );
      expect(user.code).toEqual(200);
      expect(user.message).toBe('Update successful');
      expect(user.data.full_name).toBe('testttt');
    });
  });
  describe('delete user', () => {
    it('should return message after delete success', async () => {
      const user = await userService.remove(userCreate.id);
      expect(user.code).toEqual(200);
      expect(user.message).toBe('User delete successful');
    });
    it('should return a error if user not found', async () => {
      try {
        await userService.remove(mockId);
      } catch (error) {
        expect(error.message).toBe('User not found');
        expect(error.status).toBe(404);
      }
    });
  });
});
