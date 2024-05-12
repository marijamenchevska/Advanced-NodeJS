import { Delete, Query, UseGuards } from '@nestjs/common';
import { HttpCode, ParseUUIDPipe, Put } from '@nestjs/common';
import { Body, Get, Param, Post, ValidationPipe } from '@nestjs/common';
import { Controller, UsePipes } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AlbumsService } from './albums.service';
import { Album } from './album.entity';
import { AlbumCreateDto } from './dtos/album-create.dto';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { ICurrentUser } from '../common/types/current-user.interface';
import { AlbumUpdateDto } from './dtos/album-update.dto';
import { TrimStringsPipe } from '../common/pipes/trim-strings.pipe';
import { CapitalizeWordsPipe } from '../common/pipes/capitalize-words.pipe';
import { AlbumQueryDto } from './dtos/album-query.dto';
import { JwtAuthGuard } from '../common/guards/jwt.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/roles.enum';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@UsePipes(new ValidationPipe({
    whitelist: true,
    forbidUnknownValues: true,
    transform: true
}))
@ApiTags('Albums')
@ApiUnauthorizedResponse({ description: 'You need to log in to access this page' })
@Controller('albums')
@Roles(Role.ADMIN)
export class AlbumsController {
    constructor(private readonly albumService: AlbumsService) {}

    @ApiOperation({ summary: 'Get all albums'})
    @ApiQuery({
        required: false,
        name: 'title',
        description: `Album's title`
    })
    @ApiQuery({
        required: false,
        name: 'artistId',
        description: `Album's artist`
    })
    @ApiQuery({
        required: false,
        name: 'releaseYear',
        description: `Album's release year`
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
    @ApiOkResponse({
        type: [Album],
        description: 'All songs are retrieved'
    })
    @Get('/')
    @Roles(Role.MODERATOR, Role.USER)
    getAlbums(@Query() query: AlbumQueryDto): Promise<Album[]> {
        return this.albumService.getAlbums(query);
    }

    @ApiOperation({ summary: 'Get an album' })
    @ApiParam({
        type: String,
        name: 'id',
        description: `Album's ID`
    })
    @ApiOkResponse({
        type: Album,
        description: 'The album with the requested ID is retrieved'
    })
    @ApiNotFoundResponse({ description: `The artist with the requested ID doesn't exist` })
    @Get('/:id')
    @Roles(Role.MODERATOR, Role.USER)
    getAlbum(@Param('id', ParseUUIDPipe) id: string): Promise<Album> {
        return this.albumService.getAlbum(id);
    }

    @ApiOperation({ summary: 'Create an album' })
    @ApiBody({ type: AlbumCreateDto })
    @ApiCreatedResponse({
        type: Album,
        description: 'The album from the request body is created'
    })
    @ApiBadRequestResponse({ description: `The request body has wrong information, lacks some information, the provided artistId doesn't exist or the album already exists` })
    @ApiForbiddenResponse({ description: 'You are unauthorized to access this page' })
    @Post('/')
    @Roles(Role.MODERATOR)
    @UsePipes(TrimStringsPipe, CapitalizeWordsPipe)
    createAlbum(@Body() body: AlbumCreateDto, @CurrentUser() user: ICurrentUser): Promise<Album> {
        return this.albumService.createAlbum(body, user);
    }

    @ApiOperation({ summary: 'Update an album' })
    @ApiParam({
        type: String,
        name: 'id',
        description: `Album's ID`
    })
    @ApiBody({ type: AlbumUpdateDto })
    @ApiResponse({
        status: 200,
        type: Album,
        description: 'The album with the requested ID is updated'
    })
    @ApiBadRequestResponse({  description: `The provided artistId doesn't exist` })
    @ApiForbiddenResponse({ description: 'You are unauthorized to access this page' })
    @ApiInternalServerErrorResponse({ description: `The album with the requested ID doesn't exist` })
    @Put('/:id')
    @Roles(Role.MODERATOR)
    @UsePipes(TrimStringsPipe, CapitalizeWordsPipe)
    updateAlbum(@Param('id', ParseUUIDPipe) id: string, @Body() body: AlbumUpdateDto, @CurrentUser() user: ICurrentUser): Promise<Album> {
        return this.albumService.updateAlbum(id, body, user);
    }

    @ApiOperation({ summary: 'Delete an album' })
    @ApiParam({
        type: String,
        name: 'id',
        description: `Album's ID`
    })
    @ApiResponse({
        status: 204,
        description: 'The album with the requested ID is deleted'
    })
    @ApiForbiddenResponse({ description: 'You are unauthorized to access this page' })
    @HttpCode(204)
    @Delete('/:id')
    deleteAlbum(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: ICurrentUser): Promise<void> {
        return this.albumService.deleteAlbum(id, user);
    }
}
