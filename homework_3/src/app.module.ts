import { Module } from '@nestjs/common';
import { ArtistsModule } from './artists/artists.module';
import { SongsModule } from './songs/songs.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, ArtistsModule, SongsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
