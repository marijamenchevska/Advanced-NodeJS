import { IsEnum, IsOptional } from "class-validator";
import { Genre } from "../../common-enums/genres.enum";


export class SongQueryDto {
    // Genre should technically be mandatory, but since we're using getSongsByGenre in getArtists, and genre is optional in ArtistQueryDto, genre must also be optional here
    @IsEnum(Genre)
    @IsOptional()
    genre?: Genre;
}