import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly usersService: UserService,
  ) {}

  @Post('login')
  signIn(@Body() @Body() signInDto: CreateUserDto) {
    return this.authService.signIn(signInDto.login, signInDto.password);
  }
  @Post('signup')
  signUp(@Body() @Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
