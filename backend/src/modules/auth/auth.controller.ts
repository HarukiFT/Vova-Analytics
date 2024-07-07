import { Body, Controller, Post } from '@nestjs/common';
import { JoinUserDto } from './dto/join-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/signin')
    async signIn(@Body() joinUserDto: JoinUserDto): Promise<{token: string}> {
        const token = await this.authService.signIn(joinUserDto)

        return {
            token
        }
    }
}
