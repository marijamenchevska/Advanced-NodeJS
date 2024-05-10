import { IsBoolean, IsDate, IsEmail, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, Min } from "class-validator";
import { PayType } from "../../common/enums/pay-type.enum";
import { Transform } from "class-transformer";

export class EmployeeQueryDto {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    name?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    jobTitle?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsInt()
    @Min(1000)
    minPayRate?: number;

    @IsOptional()
    @IsNotEmpty()
    @IsInt()
    @Min(1000)
    maxPayRate?: number;

    @IsOptional()
    @IsEnum(PayType)
    payType?: PayType;

    @IsOptional()
    @IsNotEmpty()
    @IsBoolean()
    isActive?: boolean;
}