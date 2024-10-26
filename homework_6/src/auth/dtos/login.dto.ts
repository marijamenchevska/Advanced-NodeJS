import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  @ApiProperty({
    type: String,
    description: `User's email`,
    example: 'marija@gmail.com',
  })
  username: string;

  @IsStrongPassword()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: `User's password`,
    example: 'Pass111!',
  })
  password: string;
}
