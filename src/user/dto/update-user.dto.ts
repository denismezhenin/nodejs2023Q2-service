import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  oldPassword: string; // previous password

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  newPassword: string; // new password
}
