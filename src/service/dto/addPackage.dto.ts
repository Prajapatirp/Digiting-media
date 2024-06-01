import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class AddPackageDto {
  @ApiProperty({
    example: 'Silver',
    type: 'string',
    format: 'string',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  package_name: string;

  @ApiProperty({
    example: '3 month',
    type: 'string',
    format: 'string',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  package_duration: string;

  @ApiProperty({
    example: 10000,
    type: 'number',
    format: 'number',
    required: false,
  })
  @IsNumber()
  @IsNotEmpty()
  package_amount: number;

  @ApiProperty({
    example: 'This package is amazing.',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsOptional()
  package_description: string;

  @ApiProperty({
    example: 'package.png',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsOptional()
  package_image: string;
}
