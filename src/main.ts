import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


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
  await app.listen(3000);
}
bootstrap();
