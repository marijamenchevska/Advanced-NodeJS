import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UsersService } from "../users/users.service";
import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UsersService) {
        /*
        The option object sent in super will be used for configuring the authentication the Strategy will execute, such as which of the field (property) names of the request object should be taken as username, and which as password
        The default options are username and password, i.e.:
        usernameField: 'username', 
        passwordField: 'password'
        (username and password are the names of the properties of the request object)
        */
        super();
    }

    // Contrary to JwtStrategy, where the argument in validate is an object, here validate directly takes the values of the username and password sent with the request 
    async validate(username: string, password: string): Promise<any> {
        const existingUser = await this.userService.getUserByUsername(username);

        if(!existingUser) throw new UnauthorizedException('Invalid credentials.')

        const passwordsMatch = await bcrypt.compare(password, existingUser.password);

        if(!passwordsMatch) throw new UnauthorizedException('Invalid credentials.');

        delete existingUser.password;

        // This will be attached in the user property of the request
        return {
            userId: existingUser.id,
            username: existingUser.username,
            role: existingUser.role
        };
        // existingUser could be sent as a whole here since it doesn't contain the password, but a new object is created instead, in order to comply with the property names of the ICurrentUser interface
    }
}