import { BadRequestException, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { SongResponseDto } from './dtos/songs-response.dto';
import { SongCreateDto } from './dtos/songs-create.dto';
import { SongUpdateDto } from './dtos/songs.update.dto';
import { ArtistsService } from '../artists/artists.service';
import { ArtistResponseDto } from '../artists/dtos/artist-response.dto';
import { SongQueryDto } from './dtos/songs-query.dto';

@Injectable()
export class SongsService {
    songs: SongResponseDto[] = [];

    constructor (
        @Inject(forwardRef(() => ArtistsService))
        private readonly artistsService: ArtistsService
    ) {}

    getSong(id: string): SongResponseDto {
        const existingSong = this.songs.find(song => song.id === id);
        
        if(!existingSong) throw new NotFoundException(`A song with id: ${id} doesn't exist.`);

        return existingSong;
    }

    getSongsByArtist(artistId: string): SongResponseDto[] {
        const existingArtist: ArtistResponseDto = this.artistsService.getArtistById(artistId);

        if(!existingArtist) throw new NotFoundException(`An artist with id: ${artistId} doesn't exist.`);

        return this.songs.filter(song => song.artistId === artistId);
    }

    getSongsByGenre(query: SongQueryDto): SongResponseDto[] {
        if(!query.genre) throw new BadRequestException('You need to select a genre.');

        return this.songs.filter(song => song.genre === query.genre);
    }

    createSong(body: SongCreateDto): SongResponseDto {
        const existingArtist: ArtistResponseDto = this.artistsService.getArtistById(body.artistId);

        if(!existingArtist) throw new NotFoundException(`An artist with id: ${body.artistId} doesn't exist.`);

        const existingSong: SongResponseDto = this.songs.find(song => (song.artistId === body.artistId) && (song.name === body.name));

        // It's highly unlikely that the same artist will have multiple songs with the same name, which means we're trying to create a song which already exists
        if(existingSong) throw new BadRequestException(`${body.name} by ${existingArtist.name} already exists.`);

        const song: SongResponseDto = {
            ...body,
            id: Date.now().toString(),
            createdAt: new Date(),
            updatedAt: new Date()
        }

        this.songs.push(song);

        return song;
    }

    updateSong(id: string, body: SongUpdateDto): SongResponseDto {
        const index = this.songs.findIndex(song => song.id === id);

        // Check if the song exists
        if(index === -1) throw new NotFoundException(`A song with id: ${id} doesn't exist.`);

        const existingArtist: ArtistResponseDto = this.artistsService.getArtistById(body.artistId);

        // Check if the artistId is still valid
        if(!existingArtist) throw new NotFoundException(`An artist with id: ${body.artistId} doesn't exist.`);

        this.songs[index] = {
            ...this.songs[index],
            ...body,
            updatedAt: new Date()
        }

        return this.songs[index];
    }

    deleteSong(id): void {
        this.songs = this.songs.filter(song => song.id !== id);
    }
}
