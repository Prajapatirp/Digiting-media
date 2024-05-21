import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateServiceDto {
  @ApiProperty({
    example: 'painting',
    type: 'string',
    format: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  serviceName: string;
}
