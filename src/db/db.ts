import { Artist } from 'src/artist/dto/create-artist.dto';
import { IUser } from 'src/user/dto/create-user.dto';


export const db: db = {
  users: [],
  artists: [],
};

export interface db {
  users: IUser[];
  artists: Artist[];
}
