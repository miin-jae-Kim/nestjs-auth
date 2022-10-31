import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { WinstonModule, utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filter/httpException.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {


    /*
      One solution is to create the logger outside of the application lifecycle, 
      using the createLogger function, and pass it to NestFactory.create. 
      Nest will then wrap our winston logger (the same instance returned by the createLogger method) 
      into the Logger class, forwarding all calls to it
    */


    logger: 
      WinstonModule.createLogger({
        // options (same as WinstonModule.forRoot() options)
        transports: [
          new winston.transports.File({ filename: 'logFile/error.log', level: 'error' }),
          new winston.transports.File({ 
            format: winston.format.combine(
              winston.format.timestamp(),
              winston.format.ms(),
              nestWinstonModuleUtilities.format.nestLike('NestJS Tutorial', {
                // options
              }),
            ),
            filename: 'logFile/combined.log',
          }),
        ],
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
  }))

  app.useGlobalFilters(new HttpExceptionFilter())

  await app.listen(3000);
}
bootstrap();
