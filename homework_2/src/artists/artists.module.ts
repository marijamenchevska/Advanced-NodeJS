import { Module, forwardRef } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { SongsModule } from '../songs/songs.module';

@Module({
    imports: [forwardRef(() => SongsModule)],
    controllers: [ArtistsController],
    providers: [ArtistsService],
    exports: [ArtistsService]
})
export class ArtistsModule {}