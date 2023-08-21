import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private configService: ConfigService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async create(userData: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(
      userData.password,
      +this.configService.get('CRYPT_SALT'),
    );
    const newUser = this.userRepository.create({
      login: userData.login,
      password: hashedPassword,
    });
    await this.userRepository.save(newUser);
    return newUser;
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    if (user.password !== updateUserDto.oldPassword) {
      throw new HttpException('Wrong passport', HttpStatus.FORBIDDEN);
    }
    user.password = updateUserDto.newPassword;
    await this.userRepository.update(id, user);
    return user;
  }

  async remove(id: string) {
    const deletedUser = await this.userRepository.delete(id);
    if (!deletedUser.affected) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
