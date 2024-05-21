import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Messages } from 'src/libs/utils/message';
import { Role } from 'src/libs/utils/enums';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      throw new ForbiddenException(Messages.ROUTE_NOT_ACCESS);
    }

    const { user } = context.switchToHttp().getRequest();

    const finalRole = requiredRoles.some((role) => user.role === role);

    return finalRole;
  }
}
