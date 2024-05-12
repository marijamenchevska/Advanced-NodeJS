import { ParseUUIDPipe } from '@nestjs/common';
import { JwtAuthGuard } from './../common/guards/jwt.guard';
import { SongCreateDto } from './dtos/songs-create.dto';
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { SongsService } from './songs.service';
import { SongUpdateDto } from './dtos/songs.update.dto';
import { SongQueryDto } from './dtos/songs-query.dto';
import { Song } from './song.entity';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Genre } from '../common/enums/genres.enum';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/roles.enum';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { ICurrentUser } from '../common/types/current-user.interface';
import { TrimStringsPipe } from '../common/pipes/trim-strings.pipe';
import { CapitalizeWordsPipe } from '../common/pipes/capitalize-words.pipe';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@UsePipes(new ValidationPipe({
    whitelist: true,
    forbidUnknownValues: true,
    transform: true
}))
@ApiTags('Songs')
@ApiUnauthorizedResponse({ description: 'You need to log in to access this page' })
@Controller('songs')
@Roles(Role.ADMIN)
export class SongsController {
    constructor (private readonly songsService: SongsService) {}

    @ApiOperation({ summary: 'Get songs (by genre)' })
    @ApiQuery({
        required: false,
        type: String,
        name: 'name',
        description: `Song's name`
    })
    @ApiQuery({
        required: false,
        type: String,
        name: 'sortBy',
        description: `Sorting criterion`
    })
    @ApiQuery({
        required: false,
        type: String,
        name: 'direction',
        description: `Sorting direction`
    })
    @ApiQuery({
        required: false,
        name: 'genre',
        enum: Genre,
        description: 'Song genre'
    })
    @ApiQuery({
        required: false,
        type: Number,
        name: 'page',
        description: `Page of results`
    })
    @ApiQuery({
        required: false,
        type: Number,
        name: 'pageSize',
        description: `Number of results per page`
    })
    @ApiOkResponse({ 
        type: [Song],
        description: 'All songs or the songs from the requested genre are retrieved'
     })
    @Get('/')
    @Roles(Role.MODERATOR, Role.USER)
    getSongs(@Query() query: SongQueryDto): Promise<Song[]> {
        return this.songsService.getSongs(query);
    }

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
    @ApiInternalServerErrorResponse({ description: `The song with the requested ID doesn't exist` })
    @Get('/:id')
    @Roles(Role.MODERATOR, Role.USER)
    getSong(@Param('id', ParseUUIDPipe) id: string): Promise<Song> {
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
    @Roles(Role.MODERATOR, Role.USER)
    getSongsByArtist(@Param('artistId', ParseUUIDPipe) artistId: string): Promise<Song[]> {
        return this.songsService.getSongsByArtist(artistId);
    }

    @ApiOperation({ summary: 'Create a song' })
    @ApiBody({ type: SongCreateDto })
    @ApiOkResponse({
        type: Song,
        description: 'The song from the request body is created'
    })
    @ApiBadRequestResponse({ description: `The request body has wrong information or lacks some information, the provided artistId doesn't exist or the song already exists` })
    @ApiForbiddenResponse({ description: 'You are unauthorized to access this page' })
    @Post('/')
    @Roles(Role.MODERATOR)
    @UsePipes(TrimStringsPipe, CapitalizeWordsPipe)
    createSong(@Body() body: SongCreateDto, @CurrentUser() user: ICurrentUser): Promise<Song> {
        return this.songsService.createSong(body, user);
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
    @ApiBadRequestResponse({  description: `The song already exists or the provided artistId or albumId doesn't exist` })
    @ApiForbiddenResponse({ description: 'You are unauthorized to access this page' })
    @ApiInternalServerErrorResponse({ description: `The song with the requested ID doesn't exist` })
    @Put('/:id')
    @Roles(Role.MODERATOR)
    @UsePipes(TrimStringsPipe, CapitalizeWordsPipe)
    updateSong(@Param('id', ParseUUIDPipe) id: string, @Body() body: SongUpdateDto, @CurrentUser() user: ICurrentUser): Promise<Song> {
        return this.songsService.updateSong(id, body, user);
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
    @ApiForbiddenResponse({ description: 'You are unauthorized to access this page' })
    @HttpCode(204)
    @Delete('/:id')
    deleteSong(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: ICurrentUser): Promise<void> {
        return this.songsService.deleteSong(id, user);
    }
}
