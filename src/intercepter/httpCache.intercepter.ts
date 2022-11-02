import { CacheInterceptor, CACHE_KEY_METADATA, CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class HttpCacheInterceptor extends CacheInterceptor {
  trackBy(context: ExecutionContext): string | undefined {

    /*
      Reflector helper class, which is provided out of the box by the framework and exposed from the @nestjs/core package. 
      Reflector can be injected into a class in the normal way


      The Reflector#get method allows us to easily access the metadata by passing in two arguments: 
      a metadata key and a context (decorator target) to retrieve the metadata from. 
    */

    const cacheKey = this.reflector.get(
      CACHE_KEY_METADATA,
      context.getHandler(),
    );
 
    if (cacheKey) {
      const request = context.switchToHttp().getRequest();
      return `${cacheKey}-${request._parsedUrl.query}`;
    }
 
    return super.trackBy(context);
  }
}