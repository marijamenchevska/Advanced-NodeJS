import { ArtistCreateDto } from "./artist-create.dto";

export class ArtistResponseDto extends ArtistCreateDto {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}