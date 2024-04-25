import { BadRequestException, Injectable } from '@nestjs/common';
import { SongCreateDto } from './dtos/songs-create.dto';
import { SongUpdateDto } from './dtos/songs.update.dto';
import { SongQueryDto } from './dtos/songs-query.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from './song.entity';
import { Artist } from 'src/artists/artist.entity';

@Injectable()
export class SongsService {
    constructor(
        @InjectRepository(Song) private songRepository: Repository<Song>,
        @InjectRepository(Artist) private artistRepository: Repository<Artist>
    ) {}

    async getSong(id: string): Promise<Song> {
        return this.songRepository.findOneByOrFail({ id });
    }

    async getSongsByArtist(artistId: string): Promise<Song[]> {
        return this.songRepository.find({
            where: {
                artistId
            }
        }); // Why can't we just write { artistId }?
    }

    async getSongsByGenre(query: SongQueryDto): Promise<Song[]> {
        if(!query.genre) throw new BadRequestException('You need to select a genre.');

        return this.songRepository.find({ 
            where: {
                genre: query.genre
            }
         });
    }

    async createSong(body: SongCreateDto): Promise<Song> {
        //Check whether the artist exists
        const existingArtist = await this.artistRepository.findOne({
            where: {
                id: body.artistId
            }
        })

        if(!existingArtist) throw new BadRequestException(`Artist ${body.artistId} doesn't exist.`);

        const { name, artistId } = body;
        
        //Check whether the song by the same artist already exists
        const existingSong = await this.songRepository.findOneBy({ name, artistId });

        if(existingSong) throw new BadRequestException(`${body.name} by ${body.artistId} already exists.`);

        const newSong: Song = this.songRepository.create(body);

        return this.songRepository.save(newSong);
    }

    async updateSong(id: string, body: SongUpdateDto): Promise<Song> {
        const song: Song = await this.songRepository.findOneByOrFail({ id });

        const existingArtist = await this.artistRepository.findOne({
            where: {
                id: body.artistId
            }
        })

        if(!existingArtist) throw new BadRequestException(`Artist ${body.artistId} doesn't exist.`);

        const updatedSong = this.songRepository.merge(song, body)

        return this.songRepository.save(updatedSong);
    }

    async deleteSong(id: string): Promise<void> {
        await this.songRepository.softDelete(id);
    }
}
