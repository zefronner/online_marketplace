import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { handleError } from "src/utils/catch-error";
import { JwtService } from "@nestjs/jwt";
import config from "src/config";
import { Status } from "src/enum";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor (private readonly jwtService: JwtService){}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try { 
            const req = context.switchToHttp().getRequest();
            const auth = req.headers?.authorization;
            if (!auth) {
                throw new UnauthorizedException('Unauthorized')
            }
            const bearer = auth.split(' ')[0];
            const token = auth.split(' ')[1];
            if(bearer != 'Bearer' || !token) {
                throw new UnauthorizedException('Token not found');
            };
            const user = this.jwtService.verify(token, {
                secret: config.ACCESS_TOKEN_KEY
            });
            if (!user) {
                throw new UnauthorizedException('Token expired');
            } else if (user?.status === Status.INACTIVE) {
                throw new BadRequestException('user is inactive')
            }
            req.user = user;
            return true;
        } catch(error) {
            return handleError(error);
        }
    }
}