import { Body, Controller, Get, Inject, Logger, LoggerService, Post, Req, UseGuards } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { LoginUserDto } from 'src/user/dto/login.user.dto';
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
}
