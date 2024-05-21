import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { Match } from 'src/libs/dto/match.decorator';

export class ForgotPasswordDto {
  @ApiProperty({ example: 'krishna@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'Shiv@013' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!#,-./:;<?\]^_`'])[A-Za-z\d@$!%*#+,-./:;<=^_`']{8,}$/,
    {
      message: 'Your password too weak',
    },
  )
  @IsNotEmpty()
  newPassword: string;

  @ApiProperty({ example: 'Shiv@013' })
  @IsNotEmpty()
  @Match('newPassword', { message: 'Your confirm Password is not match.' })
  confirmPassword: string;
}
