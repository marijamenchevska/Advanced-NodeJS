import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsInt, Min, IsOptional } from "class-validator";


export class ArtistUpdateDto {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        type: String,
        description: `Artist's name`,
        example: 'Rihanna'
    })
    name?: string;

    @IsOptional()
    @IsInt()
    @Min(13)
    @ApiProperty({
        type: Number,
        description: `Artist's age`,
        example: 35
    })
    age?: number;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        type: String,
        description: 'The country the artist is from',
        example: 'Barbados'
    })
    country?: string;
}