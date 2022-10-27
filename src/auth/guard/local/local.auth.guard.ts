import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";


/*
    The route handler will only be invoked if the user has been validated
    The req parameter will contain a user property 
    (populated by Passport during the passport-local authentication flow)
*/
@Injectable()
export class LocalAuthGuard extends AuthGuard("local") {}