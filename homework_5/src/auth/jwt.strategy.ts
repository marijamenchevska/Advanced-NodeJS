import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Role } from "../common/enums/roles.enum";

/*
These are the most common properties that can be obtained from the decoded token 
Others are: 
- nbf (not before - token can't be processed before this time)
- issuer
- audience
- JWT ID
- user permissions
*/
type JwtStrategyPayload = {
    sub: string; // Subject - the ID of the user 
    username: string, // Username/email of the user
    role: Role; // Which role/permissions the user has 
    iat: number; // Issued at
    exp: number; // Expiration time
}

@Injectable()
/*
PassportStrategy is an abstract class from NestJs which allows different authentication strategies to be implemented in a NestJs application by passing them as arguments in its constructor
Strategy (from passport-jwt) is the authentication strategy responsible for executing a JWT verification
*/
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
       // The option object sent in super will be used for configuring the authentication the Strategy will execute, such as the way the token should be extracted, taking into account the expiration of the token and which secret key to use to authenticate
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET
        })
    }

        // After validating the token, the Strategy calls a validate method with the decoded payload as an object argument, which means that JwtStrategy must contain a validate method
        async validate({ sub, username, role }: JwtStrategyPayload) {
            // Some other validation can be performed here - like what? Can we check whether the user exists in the database?

            // This object will be attached to the user property of the request
            return {
                userId: sub,
                username,
                role
            }
        }
}