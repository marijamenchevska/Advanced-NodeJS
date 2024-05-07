import { Role } from "../enums/roles.enum";

// This is the expected object structure of the user extracted from the request
export interface ICurrentUser {
    userId: string,
    username: string,
    role: Role
}