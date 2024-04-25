import { SongCreateDto } from './dtos/songs-create.dto';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { SongsService } from './songs.service';
import { SongResponseDto } from './dtos/songs-response.dto';
import { SongUpdateDto } from './dtos/songs.update.dto';
import { SongQueryDto } from './dtos/songs-query.dto';
import { Song } from './song.entity';

@UsePipes(new ValidationPipe({
    whitelist: true,
    forbidUnknownValues: true,
    transform: true
}))
@Controller('songs')
export class SongsController {
    constructor (private readonly songsService: SongsService) {}

    @Get('/:id')
    getSong(@Param('id') id: string): Promise<Song> {
        return this.songsService.getSong(id);
    }

    @Get('/artist/:artistId')
    getSongsByArtist(@Param('artistId') artistId: string): Promise<Song[]> {
        return this.songsService.getSongsByArtist(artistId);
    }

    // If we don't send a query parameter, we'll get an error (this is intentional since we're not specifically asked to handle a route which would get all songs if there weren't a query parameter)
    @Get('')
    getSongsByGenre(@Query() query: SongQueryDto): Promise<Song[]> {
        return this.songsService.getSongsByGenre(query);
    }

    @Post('/')
    createSong(@Body() body: SongCreateDto): Promise<Song> {
        return this.songsService.createSong(body);
    }

    @Put('/:id')
    updateSong(@Param('id') id: string, @Body() body: SongUpdateDto): Promise<Song> {
        return this.songsService.updateSong(id, body);
    }

    @Delete('/:id')
    deleteSong(@Param('id') id: string): Promise<void> {
        return this.songsService.deleteSong(id);
    }
}
