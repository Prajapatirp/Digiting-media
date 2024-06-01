import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches
} from 'class-validator';
import { Match } from 'src/libs/dto/match.decorator';
import { Role } from 'src/libs/utils/enums';
import { Messages } from 'src/libs/utils/message';

export class RegisterDto {
  @ApiProperty({
    example: 'Joe',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({
    example: 'John',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({
    example: 'Patel',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
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
    example: 'Admin@123',
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
    example: 'Admin@1234',
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
  phone_no: string;

  @ApiProperty({ example: 'Admin', type: 'string', required: true })
  @IsEnum({
    Admin: Role.Admin,
    Dealer: Role.Dealer
  })
  @IsNotEmpty()
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
  
  static validatePasswordRequirement(dto: RegisterDto): void {
    const requiredRoles = ['Admin', 'Dealer'];
    if (requiredRoles.includes(dto.role.toLowerCase())) {
      if (!dto.password || !dto.confirmPassword) {
        throw new Error(Messages.PASSWORD_REQUIRED);
      }
    }
  }
}
