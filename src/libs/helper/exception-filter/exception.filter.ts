import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ResponseData } from 'src/libs/utils/enums';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapter) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();

    let httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    httpStatus = exception['statusCode'] ? exception['statusCode'] : httpStatus;

    const exName = exception['name'];
    let exMessage = exception['message'];
    let exResponse;
    let trace = {};
    let data;
    if (exception instanceof HttpException) {
      exResponse = exception.getResponse();

      if (exResponse?.trace && exResponse.trace.length > 0) {
        trace = exResponse.trace;
      }
      if (exResponse?.message && exResponse.message.length > 0) {
        exMessage = exResponse.message;
      }
      if (exResponse?.data) {
        data = exResponse.data;
      }
    } else {
      trace = exception;
    }

    const responseBody = {
      statusCode: httpStatus,
      status: ResponseData.ERROR,
      message: exMessage,
    };

    this.httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
