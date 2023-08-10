import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { randomUUID } from 'crypto';
// import { db } from 'src/db/db';
import { Repository } from 'typeorm';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
  ) {}

  async create(createTrackDto: CreateTrackDto) {
    const newTrack = await this.trackRepository.create(createTrackDto);
    await this.trackRepository.save(newTrack);
    return newTrack;
  }

  async findAll() {
    return this.trackRepository.find();
  }

  async findOne(id: string) {
    const track = await this.trackRepository.findOneBy({ id });
    if (!track)
      throw new HttpException('track not found', HttpStatus.NOT_FOUND);
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const update = await this.trackRepository.update(id, updateTrackDto);
    if (!update.affected)
      throw new HttpException('track not found', HttpStatus.NOT_FOUND);
    const track = await this.trackRepository.findOneBy({ id });
    return track;
  }

  async remove(id: string) {
    const track = await this.trackRepository.delete(id);
    if (!track.affected)
      throw new HttpException('track not found', HttpStatus.NOT_FOUND);
    return;
  }
}
