import { JwtAuthGuard } from './../common/guards/jwt.guard';
import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ArtistsService } from "./artists.service";
import { ArtistCreateDto } from "./dtos/artist-create.dto";
import { ArtistUpdateDto } from "./dtos/artist-update.dto";
import { ArtistQueryDto } from "./dtos/artist-query.dto";
import { Artist } from "./artist.entity";
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { Genre } from "../common/enums/genres.enum";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../common/decorators/roles.decorator";
import { Role } from "../common/enums/roles.enum";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { ICurrentUser } from "../common/types/current-user.interface";
import { TrimStringsPipe } from '../common/pipes/trim-strings.pipe';
import { CapitalizeWordsPipe } from '../common/pipes/capitalize-words.pipe';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@UsePipes(new ValidationPipe({
    whitelist: true,
    forbidUnknownValues: true,
    transform: true
}))
@ApiTags('Artists')
@ApiUnauthorizedResponse({ description: 'You need to log in to access this page' })
@Controller('artists')
@Roles(Role.ADMIN)
export class ArtistsController {
    constructor (private readonly artistsService: ArtistsService) {}

    @ApiOperation({ summary: 'Get all artists (by having songs in genre)'})
    @ApiQuery({
        required: false,
        type: String,
        name: 'name',
        description: `Artist's name`
    })
    @ApiQuery({
        required: false,
        name: 'genre',
        enum: Genre,
        description: `Song's genre`
    })
    @ApiOkResponse({ 
        type: [Artist],
        description: 'All artists or all artists who have at least one song in the requested genre are retrieved'  
    })   
    @Get('/')
    @Roles(Role.MODERATOR, Role.USER)
    getArtists(@Query() query: ArtistQueryDto): Promise<Artist[]>
    { 
        return this.artistsService.getArtists(query);
    }

    @ApiOperation({ summary: 'Get an artist with his/her songs' })
    @ApiParam({
        type: String,
        name: 'id',
        description: `Artist's ID`
    })
    @ApiOkResponse({ 
        type: Artist,
        description: 'The artist with the requested ID is retrieved'
     })
    @ApiNotFoundResponse({ description: `The artist with the requested ID doesn't exist` })
    @Get('/:id')
    @Roles(Role.MODERATOR, Role.USER)
    getArtistWithSongs(@Param('id', ParseUUIDPipe) id: string): Promise<Artist> {
        return this.artistsService.getArtistWithSongs(id);
    }

    @ApiOperation({ summary: 'Create an artist' })
    @ApiBody({ type: ArtistCreateDto })
    @ApiCreatedResponse({
        type: Artist,
        description: 'The artist from the request body is created'
    })
    @ApiBadRequestResponse({ description: 'The request body has wrong information, lacks some information or the artist already exists' })
    @ApiForbiddenResponse({ description: 'You are unauthorized to access this page' }) 
    @Post('/')
    @Roles(Role.MODERATOR)
    @UsePipes(TrimStringsPipe, CapitalizeWordsPipe)
    createArtist(@Body() body: ArtistCreateDto, @CurrentUser() user: ICurrentUser): Promise<Artist> {
        return this.artistsService.createArtist(body, user);
    }

    @ApiOperation({ summary: 'Update an artist' })
    @ApiParam({
        type: String,
        name: 'id',
        description: `Artist's ID`
    })
    @ApiBody({ type: ArtistUpdateDto })
    @ApiResponse({ 
        status: 200,
        type: Artist,
        description: 'The artist with the requested ID is updated'
    })
    @ApiForbiddenResponse({ description: 'You are unauthorized to access this page' }) 
    @ApiInternalServerErrorResponse({ description: `The artist with the requested ID doesn't exist` })
    @Put('/:id')
    @Roles(Role.MODERATOR)
    @UsePipes(TrimStringsPipe, CapitalizeWordsPipe)
    updateArtist(@Param('id', ParseUUIDPipe) id: string, @Body() body: ArtistUpdateDto, @CurrentUser() user: ICurrentUser): Promise<Artist> {
        return this.artistsService.updateArtist(id, body, user);
    }

    @ApiOperation({ summary: 'Delete an artist' })
    @ApiParam({
        type: String,
        name: 'id',
        description: `Artist's ID`
    })
    @ApiResponse({
        status: 204,
        description: 'The artist with the requested ID is deleted'
    })
    @ApiForbiddenResponse({ description: 'You are unauthorized to access this page' })  
    @HttpCode(204)
    @Delete('/:id')
    deleteArtist(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: ICurrentUser): Promise<void> {
        return this.artistsService.deleteArtist(id, user);
    }
}