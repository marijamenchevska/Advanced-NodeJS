import { SetMetadata } from "@nestjs/common";
// import { Reflector } from "@nestjs/core";

// This is a custom decorator which will be used to 'inform' which role(s) will be attached to which controller method, while the RolesGuard will be responsible of comparing the allowed role to the user's role to allow/deny access to the method
export const Roles = (...roles: string[]) => SetMetadata('roles', roles); // key and value of the metadata

// Alternatively, we can use the Reflector to do the same thing:
// export const Roles = Reflector.createDecorator<string[]>();