import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsInt, Min, IsEnum, IsDate, IsUUID } from 'class-validator';
import { Genre } from '../../common/enums/genres.enum';
import { ApiProperty } from '@nestjs/swagger';


export class SongCreateDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        type: String,
        description: `Song's name`,
        example: 'Diamonds'
    })
    name: string;

    @IsInt()
    @Min(60)
    @ApiProperty({
        type: Number,
        minLength: 60,
        description: `Song's duration in seconds`,
        example: 255,
    })
    duration: number;

    @IsEnum(Genre)
    @ApiProperty({
        enum: Genre,
        description: `Song's genre`
    })
    genre: Genre;

    @IsDate()
    @Transform(({ value }) => new Date(value))
    @ApiProperty({
        type: Date,
        description: `Song's release date`,
        example: '2024-04-05 00:00:00'
    })
    releaseDate: Date;

    @IsNotEmpty()
    @IsUUID()
    @ApiProperty({
        type: String,
        description: `Artist's ID`,
        example: '692048d8-e727-4746-bc7f-48952fdd462d'
    })
    artistId: string;

    @IsNotEmpty()
    @IsUUID()
    @ApiProperty({
        type: String,
        description: `Artist's ID`,
        example: '692048d8-e727-4746-bc7f-48952fdd462d'
    })
    albumId: string;
}