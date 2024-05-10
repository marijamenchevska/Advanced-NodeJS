import { IsNotEmpty, IsString, IsBoolean, IsInt, IsOptional } from "class-validator";

export class DepartmentUpdateDto {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    name?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    description?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsBoolean()
    isActive?: boolean;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    officeLocation?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsInt()
    budget?: number;
}