import { ApiProperty } from '@nestjs/swagger';
import {
  IsObject,
  IsOptional,
} from 'class-validator';

export class ListOfDataDto {
  @ApiProperty({
    example: {id: 1},
    type: 'object',
    format: 'object',
    required: false,
  })
  @IsObject()
  @IsOptional()
  condition: object;

  @ApiProperty({
    example: ['id', 'designation'],
    type: 'string',
    isArray: true,
    required: false,
  })
  @IsOptional()
  selectionCriteria: string[];
}
