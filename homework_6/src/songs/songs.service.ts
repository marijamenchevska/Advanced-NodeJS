import { BadRequestException, Injectable } from '@nestjs/common';
import { SongCreateDto } from './dtos/songs-create.dto';
import { SongUpdateDto } from './dtos/songs.update.dto';
import { SongQueryDto } from './dtos/songs-query.dto';
import { FindOptionsOrder, FindOptionsWhere, ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from './song.entity';
import { Artist } from '../artists/artist.entity';
import { ICurrentUser } from '../common/types/current-user.interface';
import { Album } from '../albums/album.entity';

@Injectable()
export class SongsService {
    constructor(
        @InjectRepository(Song) private songRepository: Repository<Song>,
        @InjectRepository(Artist) private artistRepository: Repository<Artist>,
        @InjectRepository(Album) private albumRepository: Repository<Album>
    ) {}

    async getSongs({ name, genre, sortBy, direction = 'DESC', page = 1, pageSize = 10 }: SongQueryDto): Promise<Song[]> {
        let whereQuery: FindOptionsWhere<Song> = {}
        let orderQuery: FindOptionsOrder<Song> = {};
        
        if(name) {
            whereQuery = {
                ...whereQuery,
                name: ILike(`%${name}%`)
            }
        }

        if(genre) {
            whereQuery = {
                ...whereQuery,
                genre
            }
        }

        if(sortBy) {
            orderQuery = {
                [sortBy]: direction
                /* 
                This is the same as:
                orderQuery[sortBy] = direction
                */
            }
        }
        
        return this.songRepository.find({
            where: whereQuery,
            order: orderQuery,
            skip: (page - 1) * pageSize,
            take: pageSize
        });
    }

    async getSong(id: string): Promise<Song> {
        return this.songRepository.findOneByOrFail({ id });
    }

    async getSongsByArtist(artistId: string): Promise<Song[]> {
        return this.songRepository.findBy({ artistId });
    }

    async createSong(body: SongCreateDto, user: ICurrentUser): Promise<Song> {
        //Check whether the artist and the album exist
        await this.checkArtistExistence(body.artistId);
        await this.checkAlbumExistence(body.albumId);

        const { name, artistId, albumId } = body;
        
        //Check whether the song by the same artist from the same album already exists
        const existingSong: Song = await this.songRepository.findOneBy({ name, artistId, albumId });

        if(existingSong) throw new BadRequestException(`${body.name} by artist with id: ${body.artistId}, from album with id: ${body.albumId} already exists.`);

        const newBody = {
            ...body,
            createdBy: user.username
        }

        const newSong: Song = this.songRepository.create(newBody);

        return this.songRepository.save(newSong);
    }

    async updateSong(id: string, body: SongUpdateDto, user: ICurrentUser): Promise<Song> {
        const song: Song = await this.songRepository.findOneByOrFail({ id });

        if(body.artistId) await this.checkArtistExistence(body.artistId);
        if(body.albumId) await this.checkAlbumExistence(body.albumId);

        const newBody = {
            ...body,
            updatedBy: user.username
        }

        const updatedSong: Song = this.songRepository.merge(song, newBody)

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

            const deletedSong: Song = this.songRepository.merge(song, newBody);
            await this.songRepository.save(deletedSong);
        }

        await this.songRepository.softDelete(id);
    }

    async checkArtistExistence (artistId) {
        const existingArtist: Artist = await this.artistRepository.findOne({ where: { id: artistId }});

        if(!existingArtist) throw new BadRequestException(`Artist with id: ${artistId} doesn't exist.`)
    }

    async checkAlbumExistence (albumId) {
        const existingAlbum: Album = await this.albumRepository.findOne({ where: { id: albumId }});

        if(!existingAlbum) throw new BadRequestException(`Album with id: ${albumId} doesn't exist.`)
    }
}
