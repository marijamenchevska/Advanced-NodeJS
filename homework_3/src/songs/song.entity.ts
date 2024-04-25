import { Artist } from "../artists/artist.entity";
import { Genre } from "../common-enums/genres.enum";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Song {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    duration: number;

    @Column({
        enum: Genre,
        enumName: 'genre'
    })
    genre: Genre;

    @Column()
    releaseDate: Date;

    @ManyToOne(() => Artist, (artist) => artist.songs)
    @JoinColumn({
        name: 'artist_id'
    })
    artist: Artist;

    @Column({
        name: 'artist_id'
    })
    artistId: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}