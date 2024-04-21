import { Module } from '@nestjs/common';
import { ArtistsModule } from './artists/artists.module';
import { SongsModule } from './songs/songs.module';

@Module({
  imports: [ArtistsModule, SongsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
