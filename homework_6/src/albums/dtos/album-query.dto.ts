import { Transform, Type } from "class-transformer";
import { IsIn, IsInt, IsOptional, IsString, IsUUID, Min } from "class-validator";

export class AlbumQueryDto {
    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim())
    title?: string;

    @IsOptional()
    @IsUUID()
    artistId?: string;

    @IsOptional()
    @IsInt()
    @Min(1900)
    @Type(() => Number)
    releaseYear?: number;

    @IsOptional()
    @Transform(({ value }) => value.trim())
    @IsIn(['releaseYear'])
    sortBy?: string;

    @IsOptional()
    @Transform(({ value }) => value.trim())
    @Transform(({ value }) => value.toUpperCase())
    @IsIn(['ASC', 'DESC'])
    direction?: string;
}