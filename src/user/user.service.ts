import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, IUser } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { db } from 'src/db/db';
import { randomUUID } from 'crypto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  // constructor(private readonly db: db) {}
  create(createUserDto: CreateUserDto) {
    const newUser: IUser = {
      ...createUserDto,
      id: randomUUID(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    db.users.push(newUser);
    return newUser;
  }

  findAll() {
    return db.users;
  }

  findOne(id: string) {
    const user = db.users.find((el) => el.id === id);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return new UserEntity({ ...user });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user = db.users.find((el) => el.id === id);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    if (user.password !== updateUserDto.oldPassword) {
      throw new HttpException('Wrong passport', HttpStatus.FORBIDDEN);
    }
    user.password = updateUserDto.newPassword;
    user.updatedAt = Date.now();
    user.version = user.version++;
    return user;
  }

  remove(id: string) {
    const user = db.users.find((el) => el.id === id);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    db.users = db.users.filter((el) => el.id !== user.id);
    return;
  }
}
