import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";


@Injectable()
/* 
When a request is made, the JwtAuthGuard(AuthGuard) is invoked, which then proceeds to invoke the adequate strategy (JwtStrategy), which will validate the token and attach the user info (object) to the request object under the 'user' property
(The app knows to invoke the JwtStrategy because we're passing the name in front of Strategy(Jwt) in lowercase as a string argument in AuthGuard)
JwtAuthGuard, as an extension of AuthGuard, is also a guard, thus it must contain the canActivate function
In it, we are basically calling the canActivate function from the original (parent) class (AuthGuard) with super.canActivate, which will invoke the process of validation via passport (the Passport Strategy)
We could add more custom logic/condition to be fulfilled in the canActivate function and combine it with super.canActivate
Since we're not changing anything in the logic of AuthGuard, we could directly call AuthGuard('jwt') in UseGuards in the controller
*/
export class JwtAuthGuard extends AuthGuard('jwt') {
    // This method technically doesn't have to be declared in JwtAuthGuard (if we're not adding any new logic to it), it will automatically be invoked from AuthGuard
    canActivate(ctx: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        return super.canActivate(ctx);
    }

/* 
handleRequest is called after the Passport Strategy performs validation on the user, and then acts accordingly by throwing an error or returning the user 
This method technically doesn't have to be declared in JwtAuthGuard (if we're not adding any new logic to it), because like canActivate, it will automatically be invoked from AuthGuard
*/
    handleRequest(err, user, info) {
        if(err || !user) throw err || new UnauthorizedException()

// In this general case, this is unnecessary, because we're accessing the user from the request (which was attached by passport), but sometimes we may want to 'customize' the user and return it modified (the modified version will override the original user object attached from passport), or we want to test the work of the AuthGuard, etc
        return user;
    }   
}