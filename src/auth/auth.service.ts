import { CACHE_MANAGER, ForbiddenException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { LoginAuthDto } from 'src/auth/dto/login.auth.dto';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @Inject(CACHE_MANAGER)
        private cacheManager: Cache,
        private jwtService: JwtService
    ){}

    async validateUser(loginAuthInfo:LoginAuthDto):Promise<any> {
        const user = await this.userRepository.findOne({
            where: {
                email: loginAuthInfo.email,
                password: loginAuthInfo.password
            }
        });

        if (!user) {
            throw new ForbiddenException({
              statusCode: HttpStatus.FORBIDDEN,
              message: [`등록되지 않은 사용자입니다.`],
              error: 'Forbidden'
            })
          }

        const { password, ...userData } = user;
        return userData;
    }

    async login(user:any) {
        const accessToken = this.jwtService.sign({
            username: user.name,
            id: user.id
        });

        return { accessToken };
    }

    async generateAuthCode(email:string):Promise<number> {
        const authCode = Math.floor(Math.random() * (10 ** 6));
        const result = await this.cacheManager.set(`SIGN_UP_${email}`, authCode, 10000);
        return authCode;
    }

    async validateAuthCode(email:string, authCode:number):Promise<boolean> {
        const savedAuthCode = await this.cacheManager.get(`SIGN_UP_${email}`);
        return savedAuthCode == authCode;
    }
}
