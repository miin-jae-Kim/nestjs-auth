import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { WinstonModule, utilities as nestWinstonModuleUtilities } from 'nest-winston';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filter/httpException.filter';
import * as winston from 'winston';
import { HttpLoggingInterceptor } from './intercepter/httpLogging.intercepter';
import { HttpResponseInterceptor } from './intercepter/httpResponse.intercepter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
          format: winston.format.combine(
                    winston.format.timestamp(),
                    nestWinstonModuleUtilities.format.nestLike('NestJS', { prettyPrint: true }),
                  ),
        }),
      ]
    })
  });

  /*
    The ValidationPipe makes use of the powerful class-validator package and its declarative validation decorators. 
    The ValidationPipe provides a convenient approach to enforce validation rules for all incoming client payloads, 
    where the specific rules are declared with simple annotations in local class/DTO declarations in each module.
  */

  app.useGlobalPipes(new ValidationPipe({
    /*
      Payloads coming in over the network are plain JavaScript objects. 
      The ValidationPipe can automatically transform payloads to be objects typed according to their DTO classes. 
      To enable auto-transformation, set transform to true. This can be done at a method level
    */
    transform: true
  }));

  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalInterceptors(
    new HttpResponseInterceptor(),
    new HttpLoggingInterceptor(Logger)
  );

  await app.listen(3000);
}
bootstrap();
