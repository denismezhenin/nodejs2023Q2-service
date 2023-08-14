import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const newAlbum = await this.albumRepository.create(createAlbumDto);
    await this.albumRepository.save(newAlbum);
    return newAlbum;
  }

  async findAll() {
    return this.albumRepository.find();
  }

  async findOne(id: string) {
    const album = await this.albumRepository.findOneBy({ id });
    if (!album)
      throw new HttpException('album not found', HttpStatus.NOT_FOUND);
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const update = await this.albumRepository.update(id, updateAlbumDto);
    if (!update.affected)
      throw new HttpException('album not found', HttpStatus.NOT_FOUND);
    const album = await this.albumRepository.findOneBy({ id });
    return album;
  }

  async remove(id: string) {
    const album = await this.albumRepository.delete(id);
    if (!album.affected)
      throw new HttpException('album not found', HttpStatus.NOT_FOUND);
    return;
  }
}
