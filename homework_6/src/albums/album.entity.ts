import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Artist } from "../artists/artist.entity";
import { Song } from "../songs/song.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Album {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({
        type: String,
        description: `Album's ID`,
        example: '0ff3e9c2-ec93-4735-a1da-50c834a78ffc'
    })
    id: string;

    @Column()
    @ApiProperty({
        type: String,
        description: `Album's title`,
        example: 'Queen'
    })
    title: string;

    @ManyToOne(() => Artist, (artist) => artist.albums)
    @JoinColumn({ name: 'artist_id' })
    artist: Artist;

    @Column({ name: 'artist_id' })
    @ApiProperty({
        type: String,
        description: `Artist's ID`,
        example: '2352fbe4-b0e6-4b49-a9af-3a0cce0b04de'
    })
    artistId: string;

    @OneToMany(() => Song, (song) => song.album)
    @ApiPropertyOptional({
        type: [Song],
        description: `Album's songs`
    })
    songs: Song[];

    @Column({ name: 'release_year' })
    @ApiProperty({
        type: Number,
        description: `Album's release year`,
        minimum: 1900,
        example: 1973
    })
    releaseYear: number;

    @CreateDateColumn({ name: 'created_at' })
    @ApiProperty({
        type: Date,
        description: 'The date and time the album is created at',
        example: '2024-05-01 00:00:00'
    })
    createdAt: Date;

    @Column({ name: 'created_by' })
    @ApiProperty({
        type: String,
        description: 'The username of the user who created the album',
        example: 'marija@gmail.com'
    })
    createdBy: string;

    @UpdateDateColumn({ name: 'updated_at' })
    @ApiProperty({
        type: Date,
        description: 'The date and time the album is updated at',
        example: '2024-05-01 00:00:00'
    })
    updatedAt: Date;

    @Column({ 
        name: 'updated_by',
        nullable: true 
    })
    @ApiProperty({
        type: String,
        description: 'The username of the user who updated the album',
        example: 'marija@gmail.com'
    })
    updatedBy: string;

    @DeleteDateColumn({ name: 'deleted_at' })
    @ApiProperty({
        type: Date,
        description: 'The date and time the album is deleted at',
        example: '2024-05-01 00:00:00'
    })
    deletedAt: Date;

    @Column({ 
        name: 'deleted_by',
        nullable: true 
    })
    @ApiProperty({
        type: String,
        description: 'The username of the user who deleted the album',
        example: 'marija@gmail.com'
    })
    deletedBy: string;
}