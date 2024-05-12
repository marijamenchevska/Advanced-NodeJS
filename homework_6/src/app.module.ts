import { AlbumsModule } from './albums/albums.module';
import { Module } from '@nestjs/common';
import { ArtistsModule } from './artists/artists.module';
import { SongsModule } from './songs/songs.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, ArtistsModule, SongsModule, AlbumsModule,AuthModule],
  controllers: [AuthController],
  providers: [],
})
export class AppModule {}
