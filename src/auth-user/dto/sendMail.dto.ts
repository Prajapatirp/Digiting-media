import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class SendMailDto {
  @ApiProperty({
    example: 'krishna@gmail.com',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'this is subject',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsOptional()
  subject: string;

  @ApiProperty({
    example: 'this is message',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsOptional()
  message: string;
}
