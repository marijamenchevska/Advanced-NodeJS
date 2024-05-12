import { Role } from "../../common/enums/roles.enum";
import { IsEnum, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { LoginDto } from "./login.dto";


export class RegisterDto extends LoginDto {  
    @IsEnum(Role)
    @IsNotEmpty()
    @ApiProperty({
        enum: Role,
        description: `User's role`,
        example: Role.USER,
        default: Role.USER
    })
    role: Role = Role.USER;
}