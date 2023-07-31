import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { db } from 'src/db/db';

@Injectable()
export class FavoritesService {
  add(type: string, id: string) {
    const isExist = db[type + 's'].find((el) => el.id === id);
    if (!isExist)
      throw new HttpException(
        `${type} not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    db.favorites[type + 's'].push(id);
    return db.favorites;
  }

  findAll() {
    return {
      artists: db.artists.filter((el) => db.favorites.artists.includes(el.id)),
      albums: db.albums.filter((el) => db.favorites.albums.includes(el.id)),
      tracks: db.tracks.filter((el) => db.favorites.tracks.includes(el.id)),
    };
  }

  remove(type: string, id: string) {
    const isExist = db[type + 's'].find((el) => el.id === id);
    if (!isExist) {
      throw new HttpException(`${type} not found`, HttpStatus.NOT_FOUND);
    }
    db.favorites[type + 's'] = db.favorites[type + 's'].filter(
      (el) => el !== id,
    );
  }
}
