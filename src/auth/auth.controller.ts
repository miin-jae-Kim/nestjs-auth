import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtGuard } from './guard/jwt/jwt.auth.guard';
import { LocalAuthGuard } from './guard/local/local.auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(JwtGuard)
    @Get('profile')
    async profile(@Req() req) {
        return req.user;
    }

    @Post('authCode')
    async generateAuthCode(@Body() reqeustBody) {
        const authCode = this.authService.generateAuthCode(reqeustBody.email);
        return authCode;
    }

    @Post('authCode/validate')
    async validateAuthCode(@Body() requestBody) {
        const isValidated = this.authService.validateAuthCode(
            requestBody.email, 
            requestBody.authCode
        )

        return isValidated;
    }

}
