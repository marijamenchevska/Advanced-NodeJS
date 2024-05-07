import { IsEnum, IsOptional } from "class-validator";
import { Genre } from "../../common/enums/genres.enum";


export class SongQueryDto {
    @IsEnum(Genre)
    @IsOptional()
    genre?: Genre;
}