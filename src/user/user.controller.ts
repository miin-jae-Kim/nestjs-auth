import { Body, Controller, Get, Injectable, Param, Post } from '@nestjs/common';
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

    @Get()
    findAll():Promise<User[]> {
        return this.userService.findAll();
    }

    @Get(":id")
    findById(@Param("id") id:number):Promise<User> {
        return this.userService.findById(id);
    }
}
