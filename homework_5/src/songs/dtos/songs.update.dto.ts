import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, IsInt, Min, IsEnum, IsDate, IsUUID, IsOptional } from "class-validator";
import { Genre } from "../../common/enums/genres.enum";


export class SongUpdateDto {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @Transform(({ value }) => value.trim())
    @ApiProperty({
        type: String,
        description: `Song's name`,
        example: 'Diamonds'
    })
    name?: string;

    @IsOptional()
    @IsInt()
    @Min(60)
    @ApiProperty({
        type: Number,
        minLength: 60,
        description: `Song's duration in seconds`,
        example: 255,
    })
    duration?: number;

    @IsOptional()
    @IsEnum(Genre)
    @ApiProperty({
        enum: Genre,
        description: `Song's genre`
    })
    genre?: Genre;

    @IsOptional()
    @IsDate()
    @Transform(({ value }) => new Date(value))
    @ApiProperty({
        type: Date,
        description: `Song's release date`,
        example: '2024-04-05 00:00:00'
    })
    releaseDate?: Date;

    @IsOptional()
    @IsNotEmpty()
    @IsUUID()
    @ApiProperty({
        type: String,
        description: `Artist's ID`,
        example: '692048d8-e727-4746-bc7f-48952fdd462d'
    })
    artistId?: string;
}