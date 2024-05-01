import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { ArtistsService } from "./artists.service";
import { ArtistCreateDto } from "./dtos/artist-create.dto";
import { ArtistUpdateDto } from "./dtos/artist-update.dto";
import { ArtistQueryDto } from "./dtos/artist-query.dto";
import { Artist } from "./artist.entity";
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Genre } from "../common-enums/genres.enum";

@UsePipes(new ValidationPipe({
    whitelist: true,
    forbidUnknownValues: true,
    transform: true
}))
@ApiTags('Artists')
@Controller('artists')
export class ArtistsController {
    constructor (private readonly artistsService: ArtistsService) {}

    @ApiOperation({ summary: 'Get all artists (by having songs in genre)'})
    @ApiQuery({
        required: false,
        name: 'genre',
        enum: Genre,
        description: 'Song genre'
    })
    @ApiOkResponse({ 
        type: [Artist],
        description: 'All artists or all artists who have at least one song in the requested genre are retrieved' })
    @Get('/')
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
    getArtistWithSongs(@Param('id') id: string): Promise<Artist> {
        return this.artistsService.getArtistWithSongs(id);
    }

    @ApiOperation({ summary: 'Create an artist' })
    @ApiBody({ type: ArtistCreateDto })
    @ApiCreatedResponse({
        type: Artist,
        description: 'The artist from the request body is created'
    })
    @ApiBadRequestResponse({ description: 'The request body has wrong information, lacks some information or the artist already exists' }) 
    @Post('/')
    createArtist(@Body() body: ArtistCreateDto): Promise<Artist> {
        return this.artistsService.createArtist(body);
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
    @ApiInternalServerErrorResponse({ description: `The artist with the requested ID doesn't exist` })
    @Put('/:id')
    updateArtist(@Param('id') id: string, @Body() body: ArtistUpdateDto): Promise<Artist> {
        return this.artistsService.updateArtist(id, body);
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
    @HttpCode(204)
    @Delete('/:id')
    deleteArtist(@Param('id') id: string): Promise<void> {
        return this.artistsService.deleteArtist(id);
    }
}