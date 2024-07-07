import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('/register')
    async createUser(@Body() createUserDto: CreateUserDto): Promise<string> {
        await this.usersService.createUser(createUserDto)

        return 'Registered'
    }
}
