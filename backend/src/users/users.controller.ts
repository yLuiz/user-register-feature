import { Controller, Get, Post, Param, Body, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDTO } from './dto/users.dto';

@Controller('users')
export class UsersController {

    constructor (
        private _userService: UsersService
    ) {}

    @Post()
    async createUser(@Body() userDTO: UsersDTO) {
        const userCreated = await this._userService.createUser(userDTO);
        return userCreated;
    }
    

    @Get()
    async getAllUsers() {
        const users = await this._userService.getAllUsers();
        return users
    }

    @Get(':id')
    async getUserById(@Param('id') id: string) {
        const user = await this._userService.getUserById(Number(id));
        return user;
    }
}
