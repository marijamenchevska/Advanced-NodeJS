import { BadRequestException, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { ArtistResponseDto } from './dtos/artist-response.dto';
import { ArtistCreateDto } from './dtos/artist-create.dto';
import { ArtistUpdateDto } from './dtos/artist-update.dto';
import { SongsService } from '../songs/songs.service';
import { ArtistQueryDto } from './dtos/artist-query.dto';

@Injectable()
export class ArtistsService {
    artists: ArtistResponseDto[] = [];

    constructor(
        @Inject(forwardRef(() => SongsService))
        private readonly songsService: SongsService
    ) {}

    getArtists(query: ArtistQueryDto): ArtistResponseDto[] {
        let filteredArtists: ArtistResponseDto[] = [...this.artists];

        if(query.genre) {
            const allGenreArtists: string[] = this.songsService.getSongsByGenre(query).map(song => song.artistId);

            const uniqueArtistId: string[] = [...new Set(allGenreArtists)];

            filteredArtists = uniqueArtistId.map(artistId => this.getArtistById(artistId));
            // If we want the artists to be returned with their songs (full list, not just the genre songs) as well, we could use getArtistWithSongs instead of getArtistById
        }

        return filteredArtists;
    }

    // Helper method, not directly tied with any request method
    getArtistById(id: string): ArtistResponseDto {
        return this.artists.find(artist => artist.id === id);
    }

    getArtistWithSongs(id: string): ArtistUpdateDto {
        const existingArtist: ArtistResponseDto = this.getArtistById(id);

        if(!existingArtist) throw new NotFoundException(`An artist with id: ${id} doesn't exist.`);

        // The artist is not actually updated in the 'database', he/she is updated with songs just as a response to the made request
        const artist: ArtistUpdateDto = {
            ...existingArtist,
            songs: this.songsService.getSongsByArtist(id)
            // Unnecessary to check again if artist exists, but getSongsByArtist needs the check for its own separate API call
        }

        return artist;
    }

    createArtist(body: ArtistCreateDto): ArtistResponseDto {
        // Find if there's an artist with the same name
        const existingArtist = this.artists.find(artist => (artist.name === body.name) && (artist.age === body.age) && (artist.country === body.country));

        // Even if there are two singers with the same name, it's unlikely they will both also be of the same age and from the same country
        if (existingArtist) throw new BadRequestException(`Artist ${body.name}, ${body.age}, from ${body.country}, already exists.`);

        const artist: ArtistResponseDto = {
            ...body,
            id: Date.now().toString(),
            createdAt: new Date(),
            updatedAt: new Date()
        }

        this.artists.push(artist);

        return artist;
    }

    updateArtist(id: string, body: ArtistUpdateDto): ArtistResponseDto {
        const index = this.artists.findIndex(artist => artist.id === id);

        if(index === -1) throw new NotFoundException(`An artist with id: ${id} doesn't exist.`);

        // All information (name, age, country) is needed for updating the artist; if we want to partially update him/her, the properties in the artist-update.dto (which are inherited from artist-create.dto right now) need to be optional
        this.artists[index] = {
            ...this.artists[index],
            ...body,
            updatedAt: new Date()
        }

        return this.artists[index];
    }

    deleteArtist(id: string): void {
        this.artists = this.artists.filter(artist => artist.id !== id);
    }
}

