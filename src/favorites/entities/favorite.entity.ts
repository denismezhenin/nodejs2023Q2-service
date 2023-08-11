import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';
import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => Artist, { onDelete: 'CASCADE' })
  @JoinTable()
  artists: Artist[];

  @ManyToMany(() => Album, { onDelete: 'CASCADE' })
  @JoinTable()
  albums: Album[];

  @ManyToMany(() => Track, { onDelete: 'CASCADE' })
  @JoinTable()
  tracks: Track[];
}
