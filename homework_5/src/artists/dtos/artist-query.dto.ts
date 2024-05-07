import { IsEnum, IsOptional } from "class-validator";
import { Genre } from "../../common/enums/genres.enum";

export class ArtistQueryDto {
    @IsEnum(Genre)
    @IsOptional()
    genre?: Genre;
}