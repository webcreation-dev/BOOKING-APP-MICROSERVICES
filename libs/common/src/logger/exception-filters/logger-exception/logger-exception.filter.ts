import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { Response } from 'express';

@Catch()
export class LoggerExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // Statut de l'erreur (500 par défaut)
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // Construire un message détaillé de l'erreur
    const errorResponse = {
      statusCode: status,
      message: exception.message || 'Une erreur interne est survenue.',
      error: exception.name || 'InternalServerError',
      ...(process.env.NODE_ENV === 'development' && {
        stack: exception.stack, // Ajouter la stack en dev seulement
      }),
    };

    // Logger l'erreur avec nestjs-pino
    this.logger.error({
      statusCode: status,
      message: exception.message,
      name: exception.name,
      stack: exception.stack,
    });

    // Envoyer la réponse au client
    response.status(status).json(errorResponse);
  }
}
