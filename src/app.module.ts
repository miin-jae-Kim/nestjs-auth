import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Connection from 'mysql2/typings/mysql/lib/Connection';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [TypeOrmModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection:Connection) {}
}
