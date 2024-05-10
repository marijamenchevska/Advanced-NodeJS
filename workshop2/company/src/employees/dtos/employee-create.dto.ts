import { IsBoolean, IsDate, IsEmail, IsEnum, IsInt, IsNotEmpty, IsString, IsUUID, Min } from "class-validator";
import { PayType } from "../../common/enums/pay-type.enum";
import { Transform } from "class-transformer";

export class EmployeeCreateDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsInt()
    phone: number;

    @IsNotEmpty()
    @IsDate()
    @Transform(({ value }) => new Date(value))
    hireDate: Date;

    @IsNotEmpty()
    @IsString()
    jobTitle: string;

    @IsNotEmpty()
    @IsUUID()
    departmentId: string;

    @IsNotEmpty()
    @IsInt()
    @Min(1000)
    payRate: number;

    @IsEnum(PayType)
    payType: PayType;

    @IsNotEmpty()
    @IsBoolean()
    isActive: boolean;
}