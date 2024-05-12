import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, Min } from "class-validator";

export class AlbumCreateDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: `Album's title`,
        example: 'Queen'
    })
    title: string;

    @IsUUID()
    @ApiProperty({
        type: String,
        description: `Artist's ID`,
        example: '2352fbe4-b0e6-4b49-a9af-3a0cce0b04de'
    })
    artistId: string;

    @IsInt()
    @Min(1900)
    @ApiProperty({
        type: Number,
        minLength: 1990,
        description: `Album's release year`,
        example: 1998,
    })
    releaseYear: number;
}