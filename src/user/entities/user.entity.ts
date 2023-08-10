import { Exclude } from 'class-transformer';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column({ default: 1 })
  version: number;

  @Column({ type: 'bigint', nullable: true })
  createdAt: number;

  @Column({ type: 'bigint', nullable: true })
  updatedAt: number;

  @Column()
  @Exclude()
  password: string;

  @BeforeInsert()
  setDate() {
    this.createdAt = Number(Date.now());
    this.updatedAt = Date.now();
  }
  @BeforeUpdate()
  updateValue() {
    this.version += 1;
    this.updatedAt = Date.now();
    this.createdAt = Number(this.createdAt);
  }
}
