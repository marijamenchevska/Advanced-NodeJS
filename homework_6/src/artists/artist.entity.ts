import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Song } from "../songs/song.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Album } from "../albums/album.entity";

@Entity()
export class Artist {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({
        type: String,
        description: `Artist's ID`,
        example: '692048d8-e727-4746-bc7f-48952fdd462d'
    })
    id: string;

    @Column()
    @ApiProperty({
        type: String,
        description: `Artist's name`,
        example: 'Rihanna'
    })
    name: string;

    @Column()
    @ApiProperty({
        type: Number,
        description: `Artist's age`,
        example: 35
    })
    age: number;

    @Column()
    @ApiProperty({
        type: String,
        description: 'The country the artist is from',
        example: 'Barbados'
    })
    country: string;

    @OneToMany(() => Song, (song) => song.artist)
    @ApiPropertyOptional({
        type: [Song],
        description: `Artist's songs`
    })
    songs: Song[];

    @OneToMany(() => Album, (album) => album.artist)
    @ApiPropertyOptional({
        type: [Album],
        description: `Artist's albums`
    })
    albums: Album[];

    @CreateDateColumn({ name: 'created_at' })
    @ApiProperty({
        type: Date,
        description: 'The date and time the artist is created at',
        example: '2024-05-01 00:00:00'
    })
    createdAt: Date;

    @Column({ name: 'created_by' })
    @ApiProperty({
        type: String,
        description: 'The username of the user who created the artist',
        example: 'marija@gmail.com'
    })
    createdBy: string;

    @UpdateDateColumn({ name: 'updated_at' })
    @ApiProperty({
        type: Date,
        description: 'The date and time the artist is updated at',
        example: '2024-05-01 00:00:00'
    })
    updatedAt: Date;

    @Column({ 
        name: 'updated_by',
        nullable: true 
    })
    @ApiProperty({
        type: String,
        description: 'The username of the user who updated the artist',
        example: 'marija@gmail.com'
    })
    updatedBy: string;

    @DeleteDateColumn({ name: 'deleted_at' })
    @ApiProperty({
        type: Date,
        description: 'The date and time the artist is deleted at',
        example: '2024-05-01 00:00:00'
    })
    deletedAt: Date;

    @Column({ 
        name: 'deleted_by',
        nullable: true 
    })
    @ApiProperty({
        type: String,
        description: 'The username of the user who deleted the artist',
        example: 'marija@gmail.com'
    })
    deletedBy: string;
}


