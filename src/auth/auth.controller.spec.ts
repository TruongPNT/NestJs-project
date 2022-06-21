import { Test, TestingModule } from '@nestjs/testing';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

const mockId = '589b7a93-3026-47f8-bbc0-71b91dfd3eb0';
const AuthData = {
  email: 'Test',
  password: 'Test',
};
const ForgetPasswordData = {
  email: 'Test',
  newPassword: 'Test',
  otp: 'Test',
};
const mockAuthService = {
  signIn: jest.fn(),
  signUp: jest.fn(),
  verifyEmail: jest.fn(),
  requestForgetPassword: jest.fn(),
  forgetPassword: jest.fn(),
  refreshToken: jest.fn(),
};

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [NestjsFormDataModule],
      controllers: [AuthController],
      providers: [AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile();
    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('signIn', () => {
    it('service should be called', async () => {
      const spy = jest.spyOn(authService, 'signIn');
      await authController.signIn(AuthData);
      expect(spy).toBeCalled();
    });
  });
  describe('signUp', () => {
    it('service should be called', async () => {
      const spy = jest.spyOn(authService, 'signUp');
      await authController.signUp(AuthData);
      expect(spy).toBeCalled();
    });
  });
  describe('verifyEmail', () => {
    it('service should be called', async () => {
      const spy = jest.spyOn(authService, 'verifyEmail');
      await authController.verifyEmail('test', 'test');
      expect(spy).toBeCalled();
    });
  });
  describe('requestForgetPassword', () => {
    it('service should be called', async () => {
      const spy = jest.spyOn(authService, 'requestForgetPassword');
      await authController.requestForgetPassword('test');
      expect(spy).toBeCalled();
    });
  });
  describe('forgetPassword', () => {
    it('service should be called', async () => {
      const spy = jest.spyOn(authService, 'forgetPassword');
      await authController.forgetPassword(ForgetPasswordData);
      expect(spy).toBeCalled();
    });
  });
  describe('refreshToken', () => {
    it('service should be called', async () => {
      const spy = jest.spyOn(authService, 'refreshToken');
      await authController.refreshToken('test');
      expect(spy).toBeCalled();
    });
  });
});
