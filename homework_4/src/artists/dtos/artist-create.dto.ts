import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class ArtistCreateDto {
    @IsNotEmpty()
    @IsString()
    @Transform(({ value }) => value.trim())
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
    @Transform(({ value }) => value.trim())
    @ApiProperty({
        type: String,
        description: 'The country the artist is from',
        example: 'Barbados'
    })
    country: string;
}