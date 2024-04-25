import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { Song } from './song.entity';
import { Artist } from '../artists/artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Song, Artist])],
  controllers: [SongsController],
  providers: [SongsService]
})
export class SongsModule {}
