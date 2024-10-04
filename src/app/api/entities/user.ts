// entities/User.ts
import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  first_name!: string;

  @Column()
  last_name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ nullable: true }) // Token field
  resetToken!: string;

  @Column({ type: 'timestamp', nullable: true }) // Expiration date field
  resetTokenExpiration!: Date;
}
