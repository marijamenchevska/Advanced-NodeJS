import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { ICurrentUser } from "../types/current-user.interface";

// This is a custom param decorator which returns the current user extracted from the request object -> the user will then be extracted when logging in or be used as a value in the createdBy property in create artists/songs
export const CurrentUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): ICurrentUser => {
        const request = ctx.switchToHttp().getRequest();
        return request.user;
    }
)

/*
The ExecutionContext is a way of choosing in which context our application runs (HTTP, microservices or WebSocket) 
ctx.switchToHttp returns an object with methods like getRequest, getResponse, getArgs, getArgByIndex, getType, getHandler, getClass
*/