import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddServiceDto {
  @ApiProperty({
    example: 'painting',
    type: 'string',
    format: 'string',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  serviceName: string;
}
