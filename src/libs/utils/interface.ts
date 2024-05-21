import { ApiProperty } from '@nestjs/swagger';

export class StatusRO {
  @ApiProperty({ example: 200 })
  statusCode?: number;
  @ApiProperty({ example: 'successfully' })
  message?: string;
  data?: any;
  error?: any;
}

export class JwtPayload {
  id: number;
  name: string;
  role: string;
}
