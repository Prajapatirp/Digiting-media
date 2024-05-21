import { ApiProperty } from '@nestjs/swagger';
import { IsMobilePhone, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: '1234567890',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsMobilePhone()
  @IsNotEmpty()
  contactNo: string;

  @ApiProperty({
    example: 'Krishna@1234',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
