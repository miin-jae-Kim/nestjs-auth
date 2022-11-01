import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginAuthDto } from 'src/auth/dto/login.auth.dto';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
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
}
