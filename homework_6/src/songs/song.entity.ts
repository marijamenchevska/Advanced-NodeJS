import { ApiProperty } from "@nestjs/swagger";
import { Artist } from "../artists/artist.entity";
import { Genre } from "../common/enums/genres.enum";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Album } from "../albums/album.entity";

@Entity()
export class Song {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({
        type: String,
        description: `Song's ID`,
        example: '0ff3e9c2-ec93-4735-a1da-50c834a78ffc'
    })
    id: string;

    @Column()
    @ApiProperty({
        type: String,
        description: `Song's name`,
        example: 'Diamonds'
    })
    name: string;

    @Column()
    @ApiProperty({
        type: Number,
        description: `Song's duration in seconds`,
        example: 255
    })
    duration: number;

    @Column({
        enum: Genre,
        enumName: 'genre'
    })
    @ApiProperty({
        enum: Genre,
        description: `Song's genre`
    })
    genre: Genre;

    @Column({ name: 'release_date' })
    @ApiProperty({
        type: Date,
        description: `Song's release date`,
        example: '2024-04-05 00:00:00'
    })
    releaseDate: Date;

    @ManyToOne(() => Artist, (artist) => artist.songs)
    @JoinColumn({
        name: 'artist_id'
    })
    artist: Artist;

    @Column({
        name: 'artist_id'
    })
    @ApiProperty({
        type: String,
        description: `Artist's ID`,
        example: '692048d8-e727-4746-bc7f-48952fdd462d'
    })
    artistId: string;

    @ManyToOne(() => Album, (album) => album.songs)
    @JoinColumn({
        name: 'album_id'
    })
    album: Album;

    @Column({
        name: 'album_id'
    })
    @ApiProperty({
        type: String,
        description: `Album's ID`,
        example: '692048d8-e727-4746-bc7f-48952fdd462d'
    })
    albumId: string;

    @CreateDateColumn({ name: 'created_at' })
    @ApiProperty({
        type: Date,
        description: 'The date and time the song is created at',
        example: '2024-05-01 00:00:00'
    })
    createdAt: Date;

    @Column({ name: 'created_by' })
    @ApiProperty({
        type: String,
        description: 'The username of the user who created the song',
        example: 'marija@gmail.com'
    })
    createdBy: string;

    @UpdateDateColumn({ name: 'updated_at' })
    @ApiProperty({
        type: Date,
        description: 'The date and time the song is updated at',
        example: '2024-05-01 00:00:00'
    })
    updatedAt: Date;

    @Column({ 
        name: 'updated_by',
        nullable: true 
    })
    @ApiProperty({
        type: String,
        description: 'The username of the user who updated the song',
        example: 'marija@gmail.com'
    })
    updatedBy: string;

    @DeleteDateColumn({ name: 'deleted_at' })
    @ApiProperty({
        type: Date,
        description: 'The date and time the song is deleted at',
        example: '2024-05-01 00:00:00'
    })
    deletedAt: Date;

    @Column({ 
        name: 'deleted_by',
        nullable: true 
    })
    @ApiProperty({
        type: String,
        description: 'The username of the user who deleted the song',
        example: 'marija@gmail.com'
    })
    deletedBy: string;
}