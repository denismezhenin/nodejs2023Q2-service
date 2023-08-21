import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
// import { UserService } from 'src/user/user.service';
import { EntityManager, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { RefreshDto } from './dto/refreshAuth.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private readonly entityManager: EntityManager,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async signIn(login: string, pass: string) {
    const user = await this.userRepository.findOneBy({ login });
    if (!user) throw new HttpException('User not found', HttpStatus.FORBIDDEN);
    const passwordValid = await bcrypt.compare(pass, user.password);
    if (!passwordValid)
      throw new HttpException('Wrong password', HttpStatus.FORBIDDEN);
    return await this.createResponse(user.id, user.login);
  }

  async refreshToken(refreshDto: RefreshDto) {
    if (!refreshDto.token) {
      throw new UnauthorizedException();
    }
    let payload: any;
    try {
      payload = await this.jwtService.verifyAsync(refreshDto.token, {
        secret: this.configService.get('JWT_SECRET_KEY'),
      });
    } catch {
      throw new ForbiddenException();
    }
    const user = await this.userRepository.findOneBy({
      id: payload.userId,
    });

    if (!user) {
      throw new ForbiddenException();
    }
    return await this.createResponse(user.id, user.login);
  }

  async createResponse(userId: string, login: string) {
    const { accessToken, refreshToken } = await this.generateTokens(
      userId,
      login,
    );
    const decodedToken = this.jwtService.decode(accessToken);
    const expiresIn = (+decodedToken['exp'] - Date.now() / 1000).toFixed(0);
    await this.entityManager.update(
      UserEntity,
      { id: userId },
      { refreshToken },
    );
    return {
      accessToken,
      expiresIn,
      tokenType: 'Bearer',
      refreshToken,
    };
  }
  async generateTokens(userId: string, login: string) {
    const accessToken = await this.jwtService.signAsync({ userId, login });
    const refreshToken = await this.jwtService.signAsync(
      { userId, login },
      {
        secret: this.configService.get('JWT_SECRET_REFRESH_KEY'),
        expiresIn: this.configService.get('TOKEN_REFRESH_EXPIRE_TIME'),
      },
    );

    return { accessToken, refreshToken };
  }
}
