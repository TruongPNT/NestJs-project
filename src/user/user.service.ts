import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private usersRepository: UsersRepository) {}

  create(createUserDto: CreateUserDto) {
    return this.usersRepository.createUser(createUserDto);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: string) {
    return this.usersRepository.findOne({ id: id });
  }

  findOneByEmail(email: string) {
    return this.usersRepository.findOne({ email: email });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.usersRepository.updateUser(id, updateUserDto);
  }

  remove(id: string) {
    return this.usersRepository.destroyProduct(id);
  }

  verifyEmail(email: string) {
    return this.usersRepository.verifyEmail(email);
  }

  updatePassword(email: string, newPassword: string) {
    return this.usersRepository.updatePassword(email, newPassword);
  }
}
