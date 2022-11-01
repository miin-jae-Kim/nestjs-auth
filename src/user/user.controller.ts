import { Body, CacheInterceptor, CacheKey, CacheTTL, Controller, Get, Injectable, Param, Post, UseInterceptors } from '@nestjs/common';
import { HttpCacheInterceptor } from 'src/intercepter/httpCache.intercepter';
import { CreateUserDto } from './dto/create.user.dto';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

@Controller("user")
export class UserController {
    constructor(private userService: UserService) {}

    @Post()
    create(@Body() createUserDto:CreateUserDto):Promise<any> {
        return this.userService.create(createUserDto);
    }


    @UseInterceptors(HttpCacheInterceptor)
    @CacheKey("USERS_CACHE_KEY")
    @CacheTTL(120)
    @Get()
    findAll():Promise<User[]> {
        return this.userService.findAll();
    }

    @Get(":id")
    findById(@Param("id") id:number):Promise<User> {
        return this.userService.findById(id);
    }
}
