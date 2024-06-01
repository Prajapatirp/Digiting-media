import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsOptional,
  IsString,
} from 'class-validator';
import { Role } from 'src/libs/utils/enums';

export class UpdateProfileDto {
  @ApiProperty({
    example: 'Joe',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsOptional()
  first_name: string;

  @ApiProperty({
    example: 'John',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsOptional()
  last_name: string;

  @ApiProperty({
    example: 'Patel',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsOptional()
  middle_name: string;

  @ApiProperty({
    example: 'admin@gmail.com',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({
    example: '5678345673',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsMobilePhone()
  @IsOptional()
  phone_no: string;

  @ApiProperty({ example: 'Admin', type: 'string', required: true })
  @IsEnum({
    Admin: Role.Admin,
    Dealer: Role.Dealer
  })
  @IsOptional()
  role: string;

  @ApiProperty({
    example: 'user.png',
    type: 'string',
    format: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  profile_image: string;
}