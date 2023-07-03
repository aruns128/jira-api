import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Registration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  acceptedTerms: boolean;
}
