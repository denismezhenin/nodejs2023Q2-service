import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiNoContentResponse,
  ApiOperation,
} from '@nestjs/swagger';

@ApiTags('Albums') // Add the ApiTags decorator to define the tag for the controller
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Album created', type: CreateAlbumDto }) // Decorate the create method with ApiCreatedResponse
  @ApiBadRequestResponse({ description: 'Bad request' }) // Decorate with ApiBadRequestResponse to handle validation errors
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all artists',
    description: 'Gets all artists',
  })
  @ApiOkResponse({ description: 'Get all albums', type: [CreateAlbumDto] }) // Decorate the findAll method with ApiOkResponse
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Get single album by id',
    type: CreateAlbumDto,
  }) // Decorate the findOne method with ApiOkResponse
  @ApiBadRequestResponse({ description: 'Invalid albumId format' }) // Decorate with ApiBadRequestResponse for invalid uuid
  @ApiNotFoundResponse({ description: 'Album not found' }) // Decorate with ApiNotFoundResponse if the record is not found
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.albumService.findOne(id);
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Album updated', type: CreateAlbumDto }) // Decorate the update method with ApiOkResponse
  @ApiBadRequestResponse({ description: 'Invalid albumId format' }) // Decorate with ApiBadRequestResponse for invalid uuid
  @ApiNotFoundResponse({ description: 'Album not found' }) // Decorate with ApiNotFoundResponse if the record is not found
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @ApiNoContentResponse({ description: 'Album deleted' }) // Decorate the remove method with ApiNoContentResponse
  @ApiBadRequestResponse({ description: 'Invalid albumId format' }) // Decorate with ApiBadRequestResponse for invalid uuid
  @ApiNotFoundResponse({ description: 'Album not found' }) // Decorate with ApiNotFoundResponse if the record is not found
  @HttpCode(204)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.albumService.remove(id);
  }
}
