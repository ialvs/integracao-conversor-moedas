import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import {UpdateResult, DeleteResult} from 'typeorm';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('api/v1/users')
export class UserController {
 constructor(private userService: UserService) { }

@Get()
async GetAll(): Promise<User[]>{
    return await this.userService.findAll()
}

@Post()
async Create(@Body() user: User): Promise<User>{
    return await this.userService.create(user)
}

@Get(':id')
async GetOne(@Param('id') id: number): Promise<User>{
    return await this.userService.findOne(id)
}

@Delete(':id')
async Delete(@Param() id: number): Promise<DeleteResult>{

    return await this.userService.remove(id)
}

@Put(':id')
 async Update(@Param() id: number, @Body() user : User): Promise<UpdateResult> {
   return await this.userService.update(id, user);

 }

}