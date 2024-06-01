import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePackageDto {
  @ApiProperty({
    example: 'Silver',
    type: 'string',
    format: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  package_name: string;

  @ApiProperty({
    example: '3 month',
    type: 'string',
    format: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  package_duration: string;

  @ApiProperty({
    example: 10000,
    type: 'number',
    format: 'number',
    required: false,
  })
  @IsNumber()
  @IsOptional()
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
