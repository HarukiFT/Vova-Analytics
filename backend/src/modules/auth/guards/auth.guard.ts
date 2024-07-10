import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { IJwtPayload } from "src/shared/interfaces/jwt-payload.interface";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const splitted: string[] = request.headers['authorization']?.split(' ') ?? []

        if (splitted.length !== 2 || splitted[0] !== 'Bearer') {
            throw new UnauthorizedException()
        }

        try {
            const payload: IJwtPayload = await this.jwtService.verifyAsync(splitted[1])
            
            request.user = payload
        } catch {
            throw new UnauthorizedException()
        }

        return true
    }
    
}