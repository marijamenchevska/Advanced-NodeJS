import { IsDivisibleBy, IsEnum, IsIn, IsOptional, IsString, Min } from "class-validator";
import { Genre } from "../../common/enums/genres.enum";
import { Transform, Type } from "class-transformer";


export class SongQueryDto {
    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim())
    name?: string;

    @IsOptional()
    @IsEnum(Genre)
    genre?: Genre;

    @IsOptional()
    @Transform(({ value }) => value.trim())
    @Transform(({ value }) => value.toLowerCase())
    @IsIn(['duration']) // Other sorting criteria could easily be allowed by inserting them here
    sortBy?: string;

    @IsOptional()
    @Transform(({ value }) => value.trim())
    @Transform(({ value }) => value.toUpperCase())
    @IsIn(['ASC', 'DESC'])
    direction?: string;

    @IsOptional()
    @Min(1)
    @Type(() => Number)
    page?: number;

    @IsOptional()
    @IsDivisibleBy(5) // We want to get 5, 10, 15, etc results per page
    @Type(() => Number)
    pageSize?: number;
}