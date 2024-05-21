import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class UpdateProfileDto {
  @ApiProperty({
    example: 'krishna',
    type: 'string',
    format: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    example: '1234567890',
    type: 'string',
    format: 'string',
    required: false,
  })
  @IsString()
  @IsMobilePhone()
  @IsOptional()
  contactNo: string;

  @ApiProperty({ example: 'Manager', type: 'string', required: true })
  @IsEnum({
    Employee: 'Employee',
    Vendor: 'Vendor',
    Manager: 'Manager',
    Admin: 'Admin',
  })
  @IsOptional()
  role: string;

  @ApiProperty({
    example: 'Anand Nagar Flats, 40/406, Prahlad Nagar',
    type: 'string',
    format: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  address: string;

  @ApiProperty({
    example: '380015',
    type: 'string',
    format: 'string',
    required: false,
  })
  @MinLength(6)
  @MaxLength(6)
  @IsString()
  @IsOptional()
  zipCode: string;

  @ApiProperty({
    example: 'rajkot',
    type: 'string',
    format: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  city: string;

  @ApiProperty({
    example: 'krishna@gmail.com',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({
    example: 'gujarat',
    type: 'string',
    format: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  state: string;

  @ApiProperty({
    example: 'Developer',
    type: 'string',
    format: 'string',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  @ValidateIf((o) => o.role === 'Employee')
  designation: string;

  @ApiProperty({
    example: 'Image-2345sds',
    type: 'string',
    format: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  profile_image: string;

  @ApiProperty({
    example: [1, 2],
    type: 'array',
    items: { type: 'number' },
    required: false,
  })
  @IsNumber({}, { each: true })
  @IsNotEmpty()
  @ValidateIf((o) => o.role === 'Vendor')
  serviceId: number[];

  @ApiProperty({
    example: [1, 2],
    type: 'array',
    items: { type: 'number' },
    required: false,
  })
  @IsNumber({}, { each: true })
  @IsOptional()
  project_id: number[];
}
