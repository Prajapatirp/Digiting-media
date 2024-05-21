import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { Match } from 'src/libs/dto/match.decorator';

export class UpdatePasswordDto {
  @ApiProperty({
    example: 'Shiv@013',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  currentPassword: string;

  @ApiProperty({
    example: 'Shiv@013',
    type: 'string',
    format: 'string',
    required: true,
  })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!#,-./:;<?\]^_`'])[A-Za-z\d@$!%*#+,-./:;<=^_`']{8,}$/,
    {
      message: 'Your password too weak',
    },
  )
  @IsString()
  @IsNotEmpty()
  newPassword: string;

  @ApiProperty({
    example: 'Shiv@013',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @Match('newPassword', { message: 'Your confirm Password is not match.' })
  @IsNotEmpty()
  confirmPassword: string;
}
