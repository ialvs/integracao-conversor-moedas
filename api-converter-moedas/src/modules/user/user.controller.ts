import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UpdateResult, DeleteResult } from 'typeorm';
import { UserService } from './user.service';
import { User } from './user.entity';
import { Patch } from '@nestjs/common/decorators/http/request-mapping.decorator';

@Controller('api/v1/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async GetAll(): Promise<User[]> {
    const users = await this.userService.findAll();

    if (users.length > 0) {
      return users;
    } else {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  async Create(@Body() user: User): Promise<User> {
    const newUser = await this.userService.create(user);

    if (newUser instanceof User) {
      return newUser;
    } else {
      throw new HttpException(
        `The data provided does not match the attributes of the User entity (name, email)`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':id')
  async GetOne(@Param('id') id: number): Promise<User> {
    const user = await this.userService.findOne(id);

    if (user) {
      return user;
    } else {
      throw new HttpException(
        `No user with id ${id} found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Delete(':id')
  async Delete(@Param() id: number): Promise<DeleteResult> {
    const user = await this.userService.remove(id);

    if (user.affected > 0) {
      return user;
    } else {
      throw new HttpException(
        `No user with id ${id} found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Patch(':id')
  async Update(
    @Param('id') id: number,
    @Body() user: User,
  ): Promise<UpdateResult> {
    const updatedUser = await this.userService.update(id, user);

    if (updatedUser.affected > 0) {
      return updatedUser;
    } else {
      throw new HttpException(
        `No user with id ${id} found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
