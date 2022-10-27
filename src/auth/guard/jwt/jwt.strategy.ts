import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: "bapbodanbbang",
        })
    }

    async validate(payload: any) {
        const user = { 
            id: payload.id, 
            username: payload.username, 
            seq: payload.seq,
            role:payload.role
        };

        return user;
    }
}