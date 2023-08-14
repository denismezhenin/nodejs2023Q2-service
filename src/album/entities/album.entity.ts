import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column({ nullable: true })
  artistId: string | null;

  @ManyToOne(() => Artist, (artist) => artist.albums, {
    onDelete: 'SET NULL',
  })
  artist: string | null;

  @OneToMany(() => Track, (track) => track.album, { cascade: true })
  tracks: Track[];
}
