import { IUser } from 'src/user/dto/create-user.dto';


export const db: db = {
  users: [],
};

export interface db {
  users: IUser[];
}
