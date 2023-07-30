import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  ParseEnumPipe,
  HttpCode,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

enum RequestRoute {
  track = 'track',
  album = 'album',
  artist = 'artist',
}

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post('/:type/:id')
  create(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('type', new ParseEnumPipe(RequestRoute)) type: string,
  ) {
    return this.favoritesService.add(type, id);
  }

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Delete('/:type/:id')
  @HttpCode(204)
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('type', new ParseEnumPipe(RequestRoute)) type: string,
  ) {
    return this.favoritesService.remove(type, id);
  }
}
