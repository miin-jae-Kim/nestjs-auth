import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LoginUserDto } from 'src/user/dto/login.user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local/local.auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req) {
        return this.authService.login(req.user);
    }
}
