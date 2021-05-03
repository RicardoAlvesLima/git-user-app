import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Git } from './git.entity';
import { Address } from './address.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: string;

  @OneToOne(() => Git, (git) => git.user, { cascade: true })
  git: Git;

  @OneToOne(() => Address, (address) => address.user, { cascade: true })
  address: Address;
}
