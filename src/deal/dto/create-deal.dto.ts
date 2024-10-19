import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import { DealStatus } from 'src/libs/utils/enums'

export class AddDealDto {
  @ApiProperty({
    example: 1,
    type: 'number',
    format: 'number',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  package_id: number

  @ApiProperty({
    example: 'Techno',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  company_name: string

  @ApiProperty({
    example: 'Patel',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  customer_name: string

  @ApiProperty({
    example: '9875462584',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  owner_mobile: string

  @ApiProperty({
    example: '9875462584',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  inquiry_number: string

  @ApiProperty({
    example: 'admin@gmail.com',
    type: 'string',
    format: 'string',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email: string

  @ApiProperty({
    example: '987456',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  pin_code: string

  @ApiProperty({
    example: '3 month',
    type: 'string',
    format: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  month: string

  @ApiProperty({
    example: 6000,
    type: 'number',
    format: 'number',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  payment: number

  @ApiProperty({
    example: 'Sola Road',
    type: 'string',
    format: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  address: string

  @ApiProperty({
    example: '3 month',
    type: 'string',
    format: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  package_details: string

  @ApiProperty({
    example: '3 month',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  payment_duration: string

  @ApiProperty({
    example: 'true',
    type: 'boolean',
    format: 'boolean',
    required: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  is_listing: boolean

  @ApiProperty({
    example:
      'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
    type: 'string',
    format: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  description: string

  @ApiProperty({
    example: '2021-11-08',
    type: 'string',
    format: 'Date',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  contract_date: Date

  @ApiProperty({
    example: '2021-11-08',
    type: 'string',
    format: 'Date',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  contract_end_date: Date

  @ApiProperty({
    example: 'User.png',
    type: 'string',
    format: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  contract_images: string

  @ApiProperty({
    example: 'User1.png',
    type: 'string',
    format: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  check_image: string

  @ApiProperty({ example: 'Open', type: 'string', required: true })
  @IsEnum({
    Open: DealStatus.open,
    Close: DealStatus.close,
  })
  @IsNotEmpty()
  status: string
}
