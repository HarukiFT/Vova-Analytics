import { Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JoinUserDto } from './dto/join-user.dto';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import mongoose from 'mongoose';
import { IJwtPayload } from 'src/shared/interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private jwtService: JwtService) {}

    async signIn(@Body() joinUserDto: JoinUserDto): Promise<string> {
        const userDocument = await this.usersService.findByUsername(joinUserDto.username)
        if (!userDocument) {
            throw new UnauthorizedException()
        }

        const isValid : boolean = await compare(joinUserDto.password, userDocument.password)
        if (!isValid) {
            throw new UnauthorizedException()
        }

        const payload: IJwtPayload = {id: (<mongoose.Types.ObjectId>userDocument._id).toHexString(), username: userDocument.username}
        const token: string = await this.jwtService.signAsync(payload)

        return token
    }
}