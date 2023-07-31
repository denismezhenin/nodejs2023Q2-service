import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  year: number;

  @IsOptional()
  @IsString()
  @ValidateIf((object, value) => value !== null)
  artistId: string | null;
}

export interface Album {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
}
