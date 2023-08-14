import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';
import { Repository } from 'typeorm';
import { Favorite } from './entities/favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
  ) {}

  async add(type: string, id: string) {
    const favorites = await this.getFavorites();
    const entity = await this.checkIsExist(type, id);
    if (!entity)
      throw new HttpException(
        `${type} not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    favorites[type + 's'].push(entity);
    await this.favoriteRepository.save(favorites);
    return `${type} has been added to favorites`;
  }

  async findAll() {
    const favorites = await this.getFavorites();
    return {
      artists: favorites.artists,
      albums: favorites.albums,
      tracks: favorites.tracks,
    };
  }

  async remove(type: string, id: string) {
    const favorites = await this.getFavorites();
    const entity = await this.checkIsExist(type, id);
    if (!entity)
      throw new HttpException(
        `${type} not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    favorites[type + 's'] = favorites[type + 's'].filter(
      (el: any) => el.id !== id,
    );
    await this.favoriteRepository.save(favorites);
    return `${type} has been deleted from favorites`;
  }

  private async getFavorites() {
    const favorites = await this.favoriteRepository.findOne({
      where: {},
      relations: {
        artists: true,
        albums: true,
        tracks: true,
      },
    });
    if (!favorites) {
      return {
        artists: [],
        albums: [],
        tracks: [],
      };
    }
    return favorites;
  }

  private async checkIsExist(type: string, id: string) {
    const entities = {
      album: this.albumRepository,
      artist: this.artistRepository,
      track: this.trackRepository,
    };
    const entity = await entities[type].findOneBy({ id });
    return entity;
  }
}
