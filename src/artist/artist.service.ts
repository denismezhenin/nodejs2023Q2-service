import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    const newArtist = await this.artistRepository.create(createArtistDto);
    await this.artistRepository.save(newArtist);
    return newArtist;
  }

  async findAll() {
    return this.artistRepository.find();
  }

  async findOne(id: string) {
    const artist = await this.artistRepository.findOneBy({ id });
    if (!artist)
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    return artist;
  }

  async update(id: string, UpdateArtistDto: UpdateArtistDto) {
    const update = await this.artistRepository.update(id, UpdateArtistDto);
    if (!update.affected)
      throw new HttpException('artist not found', HttpStatus.NOT_FOUND);
    const artist = await this.artistRepository.findOneBy({ id });
    return artist;
  }

  async remove(id: string) {
    const artist = await this.artistRepository.delete(id);
    if (!artist.affected)
      throw new HttpException('artist not found', HttpStatus.NOT_FOUND);
    return;
  }
}
