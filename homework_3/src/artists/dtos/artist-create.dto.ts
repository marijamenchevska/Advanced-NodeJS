import { Transform } from "class-transformer";
import { IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class ArtistCreateDto {
    @IsNotEmpty()
    @IsString()
    @Transform(({ value }) => value.trim())
    name: string;

    @IsInt()
    @Min(13)
    age: number;

    @IsNotEmpty()
    @IsString()
    @Transform(({ value }) => value.trim())
    country: string;
}