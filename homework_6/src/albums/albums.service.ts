import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './album.entity';
import { FindOptionsOrder, FindOptionsRelations, FindOptionsWhere, ILike, Repository } from 'typeorm';
import { AlbumCreateDto } from './dtos/album-create.dto';
import { ICurrentUser } from '../common/types/current-user.interface';
import { Artist } from '../artists/artist.entity';
import { AlbumUpdateDto } from './dtos/album-update.dto';
import { AlbumQueryDto } from './dtos/album-query.dto';

@Injectable()
export class AlbumsService {
    constructor(
        @InjectRepository(Album) private albumRepository: Repository<Album>,
        @InjectRepository(Artist) private artistRepository: Repository<Artist>
    ) {}

    async getAlbums({ title, artistId, releaseYear, sortBy, direction = 'DESC' }: AlbumQueryDto): Promise<Album[]> {
        let whereQuery: FindOptionsWhere<Album> = {};
        let relationsQuery: FindOptionsRelations<Album> = {}
        let orderQuery: FindOptionsOrder<Album> = {};

        if(title) {
            whereQuery = {
                ...whereQuery,
                title: ILike(`%${title}%`)
            }
            relationsQuery = {
                ...relationsQuery,
                songs: true
            }
        }

        if(artistId) {
            whereQuery = {
                ...whereQuery,
                artistId
            }
        }

        if(releaseYear) {
            whereQuery = {
                ...whereQuery,
                releaseYear
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

        return this.albumRepository.find({ 
            where: whereQuery,
            relations: relationsQuery,
            order: orderQuery
        });
    }

    async getAlbum(id: string): Promise<Album> {
        const album: Album = await this.albumRepository.findOne({ 
            where: { id },
            relations: {
                artist: true,
                songs: true
            }
         });

        if(!album) throw new NotFoundException(`Album with id: ${id} doesn't exist.`)
        
        return album;
    }

    async createAlbum(body: AlbumCreateDto, user: ICurrentUser): Promise<Album> {
        const { title, artistId } = body;

        // It's very unlikely that an artist will have two albums with the same name
        const existingAlbum: Album = await this.albumRepository.findOneBy({ title, artistId });

        if(existingAlbum) throw new BadRequestException(`Album ${title} by ${artistId} already exists.`);

        // If the album by that artist doesn't exist, it needs to be checked whether the artist exists
        await this.checkArtistExistence(body.artistId);

        const newBody = {
            ...body,
            createdBy: user.username
        }

        const newAlbum: Album = this.albumRepository.create(newBody);

        return this.albumRepository.save(newAlbum);
    }

    async updateAlbum(id: string, body: AlbumUpdateDto, user: ICurrentUser): Promise<Album> {
        const album: Album = await this.albumRepository.findOneByOrFail({ id });

        // If artistId is sent, it needs to be checked whether the artist exists
        if(body.artistId) await this.checkArtistExistence(body.artistId);

        const newAlbum = {
            ...body,
            updatedBy: user.username
        }

        const updatedAlbum: Album = this.albumRepository.merge(album, newAlbum);

        return this.albumRepository.save(updatedAlbum);
    }

    async deleteAlbum(id: string, user: ICurrentUser): Promise<void> {
        const album: Album = await this.albumRepository.findOneBy({ id });

        if(album) {
            const newBody = {
                ...album,
                updatedBy: user.username,
                deletedBy: user.username
            }

            const deletedAlbum: Album = this.albumRepository.merge(album, newBody);
            await this.albumRepository.save(deletedAlbum);
        }

        await this.albumRepository.softDelete(id);
    }

    async checkArtistExistence (artistId) {
        const existingArtist: Artist = await this.artistRepository.findOne({ where: { id: artistId }});

        if(!existingArtist) throw new BadRequestException(`Artist with id: ${artistId} doesn't exist.`)
    }
}
