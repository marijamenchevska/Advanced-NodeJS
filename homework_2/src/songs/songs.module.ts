import { Module, forwardRef } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { ArtistsModule } from '../artists/artists.module';

@Module({
  imports: [forwardRef(() => ArtistsModule)],
  controllers: [SongsController],
  providers: [SongsService],
  exports: [SongsService]
})
export class SongsModule {}
