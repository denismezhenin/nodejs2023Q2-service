import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { db } from 'src/db/db';
import { Album, CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  create(createAlbumDto: CreateAlbumDto) {
    const newAlbum: Album = {
      ...createAlbumDto,
      id: randomUUID(),
      artistId: createAlbumDto.artistId || null,
    };
    db.albums.push(newAlbum);
    return newAlbum;
  }

  findAll() {
    return db.albums;
  }

  findOne(id: string) {
    const album = db.albums.find((el) => el.id === id);
    if (!album)
      throw new HttpException('album not found', HttpStatus.NOT_FOUND);
    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const albumIndex = db.albums.findIndex((el) => el.id === id);
    if (albumIndex === -1)
      throw new HttpException('album not found', HttpStatus.NOT_FOUND);
    db.albums[albumIndex] = {
      ...db.albums[albumIndex],
      ...updateAlbumDto,
    };
    return db.albums[albumIndex];
  }

  remove(id: string) {
    const album = db.albums.find((el) => el.id === id);
    if (!album)
      throw new HttpException('album not found', HttpStatus.NOT_FOUND);
    db.albums = db.albums.filter((el) => el.id !== album.id);
    db.tracks.forEach((el, index) => {
      if (el.albumId === album.id) {
        db.tracks[index].albumId = null;
      }
    });
    return;
  }
}
