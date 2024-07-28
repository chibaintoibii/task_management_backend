import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Reflector} from "@nestjs/core";
import {ROLES_KEY} from "./roles.decorator";
import {Role} from "./role.enum";
import {JwtUserPayload} from "../types";


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {
  }

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
      ROLES_KEY,
      [
        context.getHandler(), context.getClass()
      ]);
    if (!requiredRoles)
      return true;
    const request = context.switchToHttp().getRequest();
    const user: JwtUserPayload = request.user
    return requiredRoles.includes(user.role)
  }
}