import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { IJwtPayload } from 'src/shared/interfaces/jwt-payload.interface';
import { UserDocument } from './schemas/User.schema';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('/register')
    async createUser(@Body() createUserDto: CreateUserDto): Promise<string> {
        await this.usersService.createUser(createUserDto)

        return 'Registered'
    }

    @Get('/data')
    @UseGuards(AuthGuard)
    async getUser(@Request() request): Promise<UserDocument | null> {
        const userPayload: IJwtPayload = request.user

        return await this.usersService.findById(userPayload.id)
    }
}
