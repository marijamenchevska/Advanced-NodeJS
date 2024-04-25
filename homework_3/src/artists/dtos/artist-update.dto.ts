import { IsArray, IsOptional } from "class-validator";
import { SongResponseDto } from "../../songs/dtos/songs-response.dto";
import { ArtistCreateDto } from "./artist-create.dto";

export class ArtistUpdateDto extends ArtistCreateDto {
    @IsArray() // Is it necessary?
    @IsOptional()
    songs?: SongResponseDto[];
}