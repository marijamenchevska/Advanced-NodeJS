import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, Min } from "class-validator";

export class AlbumUpdateDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: `Album's title`,
        example: 'Queen'
    })
    title?: string;

    @IsOptional()
    @IsUUID()
    @ApiProperty({
        type: String,
        description: `Artist's ID`,
        example: '692048d8-e727-4746-bc7f-48952fdd462d'
    })
    artistId?: string;

    @IsOptional()
    @IsInt()
    @Min(1900)
    @ApiProperty({
        type: Number,
        minLength: 1990,
        description: `Album's release year`,
        example: 1998,
    })
    releaseYear?: number;
}