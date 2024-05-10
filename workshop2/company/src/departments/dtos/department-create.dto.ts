import { IsNotEmpty, IsString, IsBoolean, IsInt } from "class-validator";

export class DepartmentCreateDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsBoolean()
    isActive: boolean;

    @IsNotEmpty()
    @IsString()
    officeLocation: string;

    @IsNotEmpty()
    @IsInt()
    budget: number;
}