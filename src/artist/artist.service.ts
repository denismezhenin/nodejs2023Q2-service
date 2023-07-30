import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { db } from 'src/db/db';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  create(createArtistDto: CreateArtistDto) {
    const newArtist = {
      ...createArtistDto,
      id: randomUUID(),
    };
    db.artists.push(newArtist);
    return newArtist;
  }

  findAll() {
    return db.artists;
  }

  findOne(id: string) {
    const artist = db.artists.find((el) => el.id === id);
    if (!artist)
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    return artist;
  }

  update(id: string, UpdateArtistDto: UpdateArtistDto) {
    const artistIndex = db.artists.findIndex((el) => el.id === id);
    if (artistIndex === -1)
      throw new HttpException('artist not found', HttpStatus.NOT_FOUND);
    db.artists[artistIndex] = {
      ...db.artists[artistIndex],
      ...UpdateArtistDto,
    };
    return db.artists[artistIndex];
  }

  remove(id: string) {
    const artist = db.artists.find((el) => el.id === id);
    if (!artist)
      throw new HttpException('artist not found', HttpStatus.NOT_FOUND);
    db.artists = db.artists.filter((el) => el.id !== artist.id);
    return;
  }
}
