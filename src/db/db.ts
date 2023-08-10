import { Album } from 'src/album/dto/create-album.dto';
import { Artist } from 'src/artist/dto/create-artist.dto';
import { ITrack } from 'src/track/dto/create-track.dto';
import { IUser } from 'src/user/dto/create-user.dto';

export const db: db = {
  users: [],
  artists: [],
  tracks: [],
  albums: [],
  favorites: {
    artists: [],
    albums: [],
    tracks: [],
  },
};

export interface db {
  users: IUser[];
  artists: Artist[];
  tracks: ITrack[];
  albums: Album[];
  favorites: {
    artists: string[];
    albums: string[];
    tracks: string[];
  };
}
