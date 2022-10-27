import { ForbiddenException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create.user.dto";
import { User } from "./entity/user.entity";

@Injectable()
export class UserService {
    constructor(
        //Inject Repository one of TypeOrm Features
        @InjectRepository(User)
        private userRepository:Repository<User>
    ){}

    async create(user:CreateUserDto):Promise<any> {
        const existUser = await this.userRepository.findOne({
            where: { email: user.email }
        });

        if(existUser) {
            throw new ForbiddenException({
                status: HttpStatus.FORBIDDEN,
                message: ["이미 등록된 사용자입니다."],
                error: "Forbidden"
            })
        }

        const { password, ...createdUserInfo } = await this.userRepository.save(user);
        return createdUserInfo;
    }

    async findAll():Promise<User[]> {
        return await this.userRepository.find();
    }

    async findById(userId:number):Promise<User> {
        return await this.userRepository.findOne({
            where: {id: userId}
        })
    }
}
