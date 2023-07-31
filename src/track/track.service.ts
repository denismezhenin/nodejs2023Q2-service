import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { db } from 'src/db/db';
import { CreateTrackDto, Track } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService {
  create(createTrackDto: CreateTrackDto) {
    const newTrack: Track = {
      ...createTrackDto,
      id: randomUUID(),
      artistId: createTrackDto.artistId || null,
      albumId: createTrackDto.albumId || null,
    };
    db.tracks.push(newTrack);
    return newTrack;
  }

  findAll() {
    return db.tracks;
  }

  findOne(id: string) {
    const track = db.tracks.find((el) => el.id === id);
    if (!track)
      throw new HttpException('track not found', HttpStatus.NOT_FOUND);
    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const trackIndex = db.tracks.findIndex((el) => el.id === id);
    if (trackIndex === -1)
      throw new HttpException('track not found', HttpStatus.NOT_FOUND);
    db.tracks[trackIndex] = {
      ...db.tracks[trackIndex],
      ...updateTrackDto,
    };
    return db.tracks[trackIndex];
  }

  remove(id: string) {
    const track = db.tracks.find((el) => el.id === id);
    if (!track)
      throw new HttpException('track not found', HttpStatus.NOT_FOUND);
    db.tracks = db.tracks.filter((el) => el.id !== track.id);
    return;
  }
}
