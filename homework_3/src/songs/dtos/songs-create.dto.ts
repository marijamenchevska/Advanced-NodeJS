import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsInt, Min, IsEnum, IsDate } from 'class-validator';
import { Genre } from '../../common-enums/genres.enum';


export class SongCreateDto {
    @IsNotEmpty()
    @IsString()
    @Transform(({ value }) => value.trim())
    name: string;

    @IsInt()
    @Min(60)
    duration: number;

    @IsEnum(Genre)
    genre: Genre;

    @IsDate()
    @Transform(({ value }) => new Date(value))
    releaseDate: Date;

    @IsNotEmpty()
    @IsString()
    artistId: string;
}