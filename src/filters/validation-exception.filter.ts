import { Catch, ExceptionFilter, ArgumentsHost, BadRequestException } from '@nestjs/common';
import { Response } from 'express';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const errorResponse = {
      statusCode: 400,
      message: exception.message,
      error: 'Bad Request',
    };
    response.status(400).json(errorResponse);
  }
}
