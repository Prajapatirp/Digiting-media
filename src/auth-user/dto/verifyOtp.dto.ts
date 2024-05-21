import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class VerifyOtpDto {
  @ApiProperty({
    example: 'krishna@gmail.com',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 987687 })
  @IsNumber()
  @IsNotEmpty()
  otp: number;
}
