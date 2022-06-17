import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

const userData = {
  full_name: 'test',
  age: 22,
  address: 'Test',
  email: 'test@example.com',
  password: 'testpassword',
};

const mockId = '589b7a93-3026-47f8-bbc0-71b91dfd3eb0';
const mockUserService = {
  findOne: jest.fn().mockImplementation((id: string) =>
    Promise.resolve({
      full_name: 'test',
      age: 22,
      address: 'Test',
      email: 'test@example.com',
      password: 'testpassword',
      id,
    }),
  ),
};
describe.skip('ProductController', () => {
  let userController: UserController;
  let userService: UserService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
    it.only('service should be called', async () => {
      await userController.findOne(mockId);
      const spy = jest.spyOn(userService, 'findOne');
      expect(spy).toBeCalled();
    });
  });
});
