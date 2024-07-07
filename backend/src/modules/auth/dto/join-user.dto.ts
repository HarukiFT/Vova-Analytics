import { IsString } from "class-validator";

export class JoinUserDto {
    @IsString()
    username: string

    @IsString()
    password: string
}