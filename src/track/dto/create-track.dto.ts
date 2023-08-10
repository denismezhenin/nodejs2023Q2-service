import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  @ValidateIf((object, value) => value !== null)
  artistId: string | null;

  @IsOptional()
  @IsString()
  @ValidateIf((object, value) => value !== null)
  albumId: string | null;

  @IsNumber()
  duration: number;
}

export interface ITrack {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}
