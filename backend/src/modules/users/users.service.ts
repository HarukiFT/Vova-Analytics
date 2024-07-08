import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User, UserDocument } from './schemas/User.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { genSalt, hash } from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

    async findByUsername(username: string): Promise<UserDocument | null> {
        return await this.userModel.findOne({username}).exec()
    }

    async findById(userId: string): Promise<UserDocument | null> {
        const userOID = mongoose.Types.ObjectId.createFromHexString(userId)

        return await this.userModel.findById(userOID).exec()
    }

    async createUser(createUserDto: CreateUserDto): Promise<undefined> {
        if (await this.findByUsername(createUserDto.username)) {
            throw new BadRequestException()
        }

        const salt = await genSalt(10)
        const hashed = await hash(createUserDto.password, salt)

        createUserDto.password = hashed

        await new this.userModel(createUserDto).save()
    }
}