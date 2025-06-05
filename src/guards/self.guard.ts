import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { Roles } from 'src/enum';
  import { handleError } from 'src/utils/catch-error';
  
  @Injectable()
  export class SelfGuard implements CanActivate {
    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
      try {
        const { user, params } = context.switchToHttp().getRequest();
        if (user.role === Roles.SUPERADMIN || params.id == user.id) {
          return true;
        }
        throw new ForbiddenException('Forbidden user');
      } catch (error) {
        return handleError(error);
      }
    }
  }
  