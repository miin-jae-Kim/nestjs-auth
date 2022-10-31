import { CallHandler, ExecutionContext, Inject, Injectable, Logger, LoggerService, NestInterceptor } from "@nestjs/common";
import { Request, Response } from "express";
import { Observable, tap } from "rxjs";

@Injectable()
export class HttpLoggingInterceptor implements NestInterceptor {

  constructor(@Inject(Logger) private readonly logger:LoggerService){}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const http = context.switchToHttp();
    const request = http.getRequest<Request>();
    const response = http.getResponse<Response>();
    this.logger.log(`Request to ${request.method} ${request.url}`);

    return next
      .handle()
      .pipe(
        tap(data => this.logger.log(`Response ${request.method} ${request.url} (${response.statusCode})`))
      );
  }
}