import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { RefreshDto } from './dto/refreshAuth.dto';
import { Public } from './skipAuth.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly usersService: UserService,
  ) {}

  @Public()
  @Post('login')
  async signIn(@Body() @Body() signInDto: CreateUserDto) {
    return await this.authService.signIn(signInDto.login, signInDto.password);
  }

  @Public()
  @Post('signup')
  async signUp(@Body() @Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Post('refresh')
  async refresh(@Body() refreshDto: RefreshDto) {
    return this.authService.refreshToken(refreshDto);
  }
}
