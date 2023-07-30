import { Album } from 'src/album/dto/create-album.dto';
import { Artist } from 'src/artist/dto/create-artist.dto';
import { Track } from 'src/track/dto/create-track.dto';
import { IUser } from 'src/user/dto/create-user.dto';

export const db: db = {
  users: [],
  artists: [],
  tracks: [],
  albums: [],
};

export interface db {
  users: IUser[];
  artists: Artist[];
  tracks: Track[];
  albums: Album[];
}
