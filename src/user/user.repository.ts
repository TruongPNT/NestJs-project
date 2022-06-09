import { BadRequestException, NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRole } from './dto/user-roles.enum';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto) {
    try {
      const { full_name, age, address, email, password } = createUserDto;
      // hash password
      const result = await this.findOne({ email: email });
      if (result) {
        return {
          code: 404,
          message: 'Email đã tồn tại',
        };
      }
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = this.create({
        full_name,
        age,
        address,
        email,
        password: hashedPassword,
        role: UserRole.USER,
        isActive: false,
      });
      await this.save(user);
      return {
        code: 200,
        message: 'Create user successful',
        data: user,
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }
  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.findOne({ id: id });
      const { full_name, age, address } = updateUserDto;
      user.full_name = full_name;
      user.age = age;
      user.address = address;
      await this.save(user);
      return {
        code: 200,
        message: 'Update user successful',
        data: user,
      };
    } catch (error) {
      if (error.code === '22P02') {
        return {
          message: 'User not found',
        };
      }
      throw new BadRequestException('Sever error');
    }
  }
  async destroyUser(id: string) {
    try {
      const user = await this.findOne({ id: id });
      if (user) {
        await this.softRemove(user);
        return {
          code: 200,
          message: 'User delete successful',
        };
      }
    } catch (error) {
      if (error.code === '22P02') {
        return {
          message: 'User not found',
        };
      }
      return new BadRequestException('Sever error');
    }
  }
  async verifyEmail(email: string) {
    const user = await this.findOne({ email: email });
    if (user) {
      return await this.save({
        ...user,
        isActive: true,
      });
    }
  }
  async updatePassword(email: string, newPassword: string) {
    try {
      const user = await this.findOne({ email: email });
      if (user) {
        const salt = await bcrypt.genSalt();
        const hasPassword = await bcrypt.hash(newPassword, salt);
        return await this.save({ ...user, password: hasPassword });
      }
    } catch (error) {
      throw new BadRequestException('Sever error');
    }
  }
  async updateForUser(updateUserDto: UpdateUserDto, user: User) {
    try {
      const result = await this.save({ ...user, ...updateUserDto });
      if (result) return { code: 200, message: 'Update successful' };
    } catch (error) {
      throw new BadRequestException('Sever error');
    }
  }
}
