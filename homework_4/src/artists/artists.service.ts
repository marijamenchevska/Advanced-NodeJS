import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ArtistCreateDto } from './dtos/artist-create.dto';
import { ArtistUpdateDto } from './dtos/artist-update.dto';
import { ArtistQueryDto } from './dtos/artist-query.dto';
import { Artist } from './artist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistsService {
    constructor(
        @InjectRepository(Artist) private artistRepository: Repository<Artist>
    ) {}

    async getArtists(query: ArtistQueryDto): Promise<Artist[]> {
        if(query.genre) {
            return this.artistRepository.find({
                where: {
                    songs: [{
                        genre: query.genre
                    }]
                }
            })
        }

        return this.artistRepository.find();
    }

    async getArtistWithSongs(id: string): Promise<Artist> {
        const artist: Artist = await this.artistRepository.findOne({
            where: {
                id
            },
            relations: {
                songs: true
            }
        });

        if(!artist) throw new NotFoundException(`Artist with id: ${id} doesn't exist.`);        

        return artist;
    }

    async createArtist(body: ArtistCreateDto): Promise<Artist> {
        const { name, age, country} = body;
        // Find if there's an artist with the same name
        const existingArtist = await this.artistRepository.findOneBy({ name, age, country });

        // Even if there are two singers with the same name, it's unlikely they will both also be of the same age and from the same country
        if (existingArtist) throw new BadRequestException(`Artist ${body.name}, ${body.age}, from ${body.country}, already exists.`);

        const newArtist: Artist = this.artistRepository.create(body);

        return this.artistRepository.save(newArtist);
    }

    async updateArtist(id: string, body: ArtistUpdateDto): Promise<Artist> {
        // All information (name, age, country) is needed for updating the artist; if we want to partially update him/her, the properties in the artist-update.dto (which are inherited from artist-create.dto right now) need to be optional
        const artist: Artist = await this.artistRepository.findOneByOrFail({ id }); 

        const newArtist = this.artistRepository.merge(artist, body);

        return this.artistRepository.save(newArtist);
    }

    async deleteArtist(id: string): Promise<void> {
        await this.artistRepository.softDelete(id);
    }
}