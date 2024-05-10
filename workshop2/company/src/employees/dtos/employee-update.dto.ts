import { IsBoolean, IsDate, IsEmail, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, Min } from "class-validator";
import { PayType } from "../../common/enums/pay-type.enum";
import { Transform } from "class-transformer";

export class EmployeeUpdateDto {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    name?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsInt()
    phone?: number;

    @IsOptional()
    @IsNotEmpty()
    @IsDate()
    @Transform(({ value }) => new Date(value))
    hireDate?: Date;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    jobTitle?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsUUID()
    departmentId?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsInt()
    @Min(1000)
    payRate?: number;

    @IsOptional()
    @IsEnum(PayType)
    payType?: PayType;
    
    @IsOptional()
    @IsNotEmpty()
    @IsBoolean()
    isActive?: boolean;
}