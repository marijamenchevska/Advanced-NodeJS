import { IsNotEmpty, IsString, IsBoolean, IsInt, IsOptional } from "class-validator";

export class DepartmentQueryDto {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    name?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    officeLocation?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsBoolean()
    isActive?: boolean;

    @IsOptional()
    @IsNotEmpty()
    @IsInt()
    budget?: number;
}