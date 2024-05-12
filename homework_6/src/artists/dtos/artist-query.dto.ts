import { IsEnum, IsOptional, IsString } from "class-validator";
import { Genre } from "../../common/enums/genres.enum";
import { Transform } from "class-transformer";

export class ArtistQueryDto {
    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim())
    name?: string;

    @IsOptional()
    @IsEnum(Genre)
    genre?: Genre;
}