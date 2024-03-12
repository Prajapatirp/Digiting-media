import { HttpStatus } from '@nestjs/common';

export function HandleResponse(
  statusCode?: number,
  message?: string,
  data?: any,
  error?: any,
) {
  return {
    statusCode: statusCode ? statusCode : HttpStatus.OK,
    message,
    data,
    error,
  };
}
