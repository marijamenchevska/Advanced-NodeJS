import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ArtistCreateDto } from './dtos/artist-create.dto';
import { ArtistUpdateDto } from './dtos/artist-update.dto';
import { ArtistQueryDto } from './dtos/artist-query.dto';
import { Artist } from './artist.entity';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { ICurrentUser } from '../common/types/current-user.interface';

@Injectable()
export class ArtistsService {
    constructor(
        @InjectRepository(Artist) private artistRepository: Repository<Artist>
    ) {}

    async getArtists({ name, genre }: ArtistQueryDto): Promise<Artist[]> {
        let whereQuery: FindOptionsWhere<Artist> = {}

        if(name) {
            whereQuery = {
                ...whereQuery,
                name: ILike(`%${name}%`)
            }
        }

        if(genre) {
            whereQuery = {
                ...whereQuery,
                songs: [{ genre }]
            }
        }

        return this.artistRepository.find({ where: whereQuery });
    }

    async getArtistWithSongs(id: string): Promise<Artist> {
        const artist: Artist = await this.artistRepository.findOne({
            where: { id },
            relations: { songs: true }
        });

        if(!artist) throw new NotFoundException(`Artist with id: ${id} doesn't exist.`);        

        return artist;
    }

    async createArtist(body: ArtistCreateDto, user: ICurrentUser): Promise<Artist> {
        const { name, age, country} = body;
        // Find if there's an artist with the same name
        const existingArtist: Artist = await this.artistRepository.findOneBy({ name, age, country });

        // Even if there are two singers with the same name, it's unlikely they will both also be of the same age and from the same country
        if (existingArtist) throw new BadRequestException(`Artist ${body.name}, ${body.age}, from ${body.country}, already exists.`);

        const newBody = {
            ...body,
            createdBy: user.username
        }

        const newArtist: Artist = this.artistRepository.create(newBody);

        return this.artistRepository.save(newArtist);
    }

    async updateArtist(id: string, body: ArtistUpdateDto, user: ICurrentUser): Promise<Artist> {
        const artist: Artist = await this.artistRepository.findOneByOrFail({ id }); 

        const newBody = {
            ...body,
            updatedBy: user.username
        }

        const newArtist: Artist = this.artistRepository.merge(artist, newBody);

        return this.artistRepository.save(newArtist);
    }

    async deleteArtist(id: string, user: ICurrentUser): Promise<void> {
        const artist: Artist = await this.artistRepository.findOneBy({ id });

        if(artist) {
            const newBody = {
                ...artist,
                updatedBy: user.username,
                deletedBy: user.username
            }

            const deletedArtist: Artist = this.artistRepository.merge(artist, newBody);
            await this.artistRepository.save(deletedArtist);
        }

        await this.artistRepository.softDelete(id);
    }
}