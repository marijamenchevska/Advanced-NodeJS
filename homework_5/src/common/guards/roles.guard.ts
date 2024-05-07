import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Roles } from "../decorators/roles.decorator";/////

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(ctx: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        // In the normal get method, the reflector will get the metadata from the Roles decorator (i.e. the 'roles' value) attached to the currently processed route handler
        // In this method, the reflector will get the metadata from the Roles decorator attached both at the route handler and at the controller class
        const permittedRoles = this.reflector.getAllAndMerge<string[]>('roles', [ctx.getHandler(), ctx.getClass()]);

        // If there are no roles attached to the route handler, it means it can be accessed by anyone
        if(!permittedRoles?.length) return true; 

        // If there are roles, we need to compare them to the user's role
        const user = ctx.switchToHttp().getRequest().user;

        // If the user's role is among the permitted roles/metadata in the Roles decorator, it will return true, which means that the user has access, and the route handler can be processed
        return permittedRoles.includes(user.role);
    }
}