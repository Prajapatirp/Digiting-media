import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { Match } from 'src/libs/dto/match.decorator';
import { Messages } from 'src/libs/utils/message';

export class RegisterDto {
  @ApiProperty({
    example: 'krishna',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

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
    example: 'Krishna@1234',
    type: 'string',
    format: 'string',
    required: false,
  })
  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!#,-./:;<?\]^_`'])[A-Za-z\d@$!%*#+,-./:;<=^_`']{8,}$/,
    {
      message: 'Your password is too weak',
    },
  )
  @IsOptional()
  password: string;

  @ApiProperty({
    example: 'Krishna@1234',
    type: 'string',
    format: 'string',
    required: false,
  })
  @IsString()
  @Match('password', { message: 'Your confirm Password is not match.' })
  @IsOptional()
  confirmPassword: string;

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

  @ApiProperty({ example: 'Manager', type: 'string', required: true })
  @IsEnum({
    Employee: 'Employee',
    Vendor: 'Vendor',
    Manager: 'Manager',
    Admin: 'Admin',
  })
  @IsNotEmpty()
  role: string;

  @ApiProperty({
    example: 'Anand Nagar Flats, 40/406, Prahlad Nagar',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    example: '380015',
    type: 'string',
    format: 'string',
    required: true,
  })
  @MinLength(6)
  @MaxLength(6)
  @IsString()
  @IsNotEmpty()
  zipCode: string;

  @ApiProperty({
    example: 'rajkot',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    example: 'gujarat',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
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

  static validatePasswordRequirement(dto: RegisterDto): void {
    const requiredRoles = ['manager', 'admin', 'super admin'];
    if (requiredRoles.includes(dto.role.toLowerCase())) {
      if (!dto.password || !dto.confirmPassword) {
        throw new Error(Messages.PASSWORD_REQUIRED);
      }
    }
  }
}
