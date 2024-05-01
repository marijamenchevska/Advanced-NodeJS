import { SongCreateDto } from './dtos/songs-create.dto';
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { SongsService } from './songs.service';
import { SongUpdateDto } from './dtos/songs.update.dto';
import { SongQueryDto } from './dtos/songs-query.dto';
import { Song } from './song.entity';
import { ApiBadRequestResponse, ApiBody, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Genre } from '../common-enums/genres.enum';

@UsePipes(new ValidationPipe({
    whitelist: true,
    forbidUnknownValues: true,
    transform: true
}))
@ApiTags('Songs')
@Controller('songs')
export class SongsController {
    constructor (private readonly songsService: SongsService) {}

    @ApiOperation({ summary: 'Get a song' })
    @ApiParam({
        type: String,
        name: 'id',
        description: `Song's ID`
    })
    @ApiOkResponse({
        type: Song,
        description: 'The song with the requested ID is retrieved'
    })
    @ApiBadRequestResponse({ description: `The song with the requested ID doesn't exist` })
    @Get('/:id')
    getSong(@Param('id') id: string): Promise<Song> {
        return this.songsService.getSong(id);
    }

    @ApiOperation({ summary: 'Get all songs from an artist' })
    @ApiParam({
        type: String,
        name: 'artistId',
        description: "Artist's ID"
    })
    @ApiOkResponse({
        type: [Song], 
        description: 'The songs from the artist with the requested ID are retrieved'
    })
    @Get('/artist/:artistId')
    getSongsByArtist(@Param('artistId') artistId: string): Promise<Song[]> {
        return this.songsService.getSongsByArtist(artistId);
    }

    @ApiOperation({ summary: 'Get songs (by genre)' })
    @ApiQuery({
        required: false,
        name: 'genre',
        enum: Genre,
        description: 'Song genre'
    })
    @ApiOkResponse({ 
        type: [Song],
        description: 'All songs or the songs from the requested genre are retrieved'
     })
    @Get('')
    getSongs(@Query() query: SongQueryDto): Promise<Song[]> {
        return this.songsService.getSongs(query);
    }

    @ApiOperation({ summary: 'Create a song' })
    @ApiBody({ type: SongCreateDto })
    @ApiOkResponse({
        type: Song,
        description: 'The song from the request body is created'
    })
    @ApiBadRequestResponse({ description: `The request body has wrong information or lacks some information, the provided artistId doesn't exist or the song already exists` })
    @Post('/')
    createSong(@Body() body: SongCreateDto): Promise<Song> {
        return this.songsService.createSong(body);
    }

    @ApiOperation({ summary: 'Update a song' })
    @ApiParam({
        type: String,
        name: 'id',
        description: "Song's ID"
    })
    @ApiBody({ type: SongUpdateDto })
    @ApiResponse({
        status: 200,
        type: Song,
        description: 'The song with the requested ID is updated'
    })
    @ApiBadRequestResponse({  description: `The provided artistId doesn't exist` })
    @ApiInternalServerErrorResponse({ description: `The provided song id doesn't exist` })
    @Put('/:id')
    updateSong(@Param('id') id: string, @Body() body: SongUpdateDto): Promise<Song> {
        return this.songsService.updateSong(id, body);
    }

    @ApiOperation({ summary: 'Delete a song' })
    @ApiParam({
        type: String,
        name: 'id',
        description: "Song's ID"
    })
    @ApiResponse({
        status: 204,
        description: 'The song with the requested ID is deleted'
    })
    @HttpCode(204)
    @Delete('/:id')
    deleteSong(@Param('id') id: string): Promise<void> {
        return this.songsService.deleteSong(id);
    }
}
