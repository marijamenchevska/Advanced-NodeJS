import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class ArtistCreateDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        type: String,
        description: `Artist's name`,
        example: 'Rihanna'
    })
    name: string;

    @IsInt()
    @Min(13)
    @ApiProperty({
        type: Number,
        description: `Artist's age`,
        example: 35
    })
    age: number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        type: String,
        description: 'The country the artist is from',
        example: 'Barbados'
    })
    country: string;
}