import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from './entities/favorite.entity';
import { Album } from 'src/album/entities/album.entity';
import { Track } from 'src/track/entities/track.entity';
import { Artist } from 'src/artist/entities/artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite, Album, Track, Artist])],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
