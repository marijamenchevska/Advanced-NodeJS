import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { ArtistsService } from "./artists.service";
import { ArtistCreateDto } from "./dtos/artist-create.dto";
import { ArtistResponseDto } from "./dtos/artist-response.dto";
import { ArtistUpdateDto } from "./dtos/artist-update.dto";
import { ArtistQueryDto } from "./dtos/artist-query.dto";

@UsePipes(new ValidationPipe({
    whitelist: true,
    forbidUnknownValues: true,
    transform: true
}))
@Controller('artists')
export class ArtistsController {
    constructor (private readonly artistsService: ArtistsService) {}

    @Get('/')
    getArtists(@Query() query: ArtistQueryDto): ArtistResponseDto[] {
        return this.artistsService.getArtists(query);
    }

    @Get('/:id')
    getArtistWithSongs(@Param('id') id: string): ArtistUpdateDto {
        return this.artistsService.getArtistWithSongs(id);
    }

    @Post('/')
    createArtist(@Body() body: ArtistCreateDto): ArtistResponseDto {
        return this.artistsService.createArtist(body);
    }

    @Put('/:id')
    updateArtist(@Param('id') id: string, @Body() body: ArtistUpdateDto): ArtistResponseDto {
        return this.artistsService.updateArtist(id, body);
    }

    @Delete('/:id')
    deleteArtist(@Param('id') id: string): void {
        return this.artistsService.deleteArtist(id);
    }
}