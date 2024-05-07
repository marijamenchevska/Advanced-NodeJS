import { BadRequestException, Injectable } from '@nestjs/common';
import { SongCreateDto } from './dtos/songs-create.dto';
import { SongUpdateDto } from './dtos/songs.update.dto';
import { SongQueryDto } from './dtos/songs-query.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from './song.entity';
import { Artist } from '../artists/artist.entity';
import { ICurrentUser } from '../common/types/current-user.interface';

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
        return this.songRepository.findBy({ artistId });
    }

    async getSongs(query: SongQueryDto): Promise<Song[]> {
        if(query.genre) {
            return this.songRepository.find({ 
                where: {
                    genre: query.genre
                }
             }); 
        }
        
        return this.songRepository.find();
    }

    async createSong(body: SongCreateDto, user: ICurrentUser): Promise<Song> {
        //Check whether the artist exists
        const existingArtist = await this.artistRepository.findOne({
            where: {
                id: body.artistId
            }
        })

        if(!existingArtist) throw new BadRequestException(`Artist with id: ${body.artistId} doesn't exist.`);

        const { name, artistId } = body;
        
        //Check whether the song by the same artist already exists
        const existingSong = await this.songRepository.findOneBy({ name, artistId });

        if(existingSong) throw new BadRequestException(`${body.name} by ${body.artistId} already exists.`);

        const newBody = {
            ...body,
            createdBy: user.username
        }

        const newSong: Song = this.songRepository.create(newBody);

        return this.songRepository.save(newSong);
    }

    async updateSong(id: string, body: SongUpdateDto, user: ICurrentUser): Promise<Song> {
        const song: Song = await this.songRepository.findOneByOrFail({ id });

        const existingArtist = await this.artistRepository.findOne({
            where: {
                id: body.artistId
            }
        })

        if(!existingArtist) throw new BadRequestException(`Artist with id: ${body.artistId} doesn't exist.`);

        const newBody = {
            ...body,
            updatedBy: user.username
        }

        const updatedSong = this.songRepository.merge(song, newBody)

        return this.songRepository.save(updatedSong);
    }

    async deleteSong(id: string, user: ICurrentUser): Promise<void> {
        const song: Song = await this.songRepository.findOneBy({ id });

        if(song) {
            const newBody = {
                ...song,
                updatedBy: user.username,
                deletedBy: user.username
            }

            const deletedSong = this.songRepository.merge(song, newBody);
            await this.songRepository.save(deletedSong);
        }

        await this.songRepository.softDelete(id);
    }
}
