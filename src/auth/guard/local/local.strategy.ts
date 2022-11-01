import { HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "src/auth/auth.service";
import { LoginAuthDto } from "src/auth/dto/login.auth.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService:AuthService){
        super({
            usernameField: "email"
        });
    }

    async validate(email:string, password:string) {
        const loginAuthDto:LoginAuthDto = {
            email: email,
            password: password
        };

        const user = await this.authService.validateUser(loginAuthDto);

        if(!user) throw new UnauthorizedException({
            status: HttpStatus.UNAUTHORIZED,
            message: ["사용자를 찾을 수 없습니다."],
            error: "Unauthorized"
        })

        return user;
    }
}