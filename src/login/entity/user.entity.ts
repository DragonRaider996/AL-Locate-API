import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("user")
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: "250" })
  username: string;

  @Column({ type: "varchar", length: "250" })
  password: string;

  @Column({ type: "varchar", length: "250", name: "role" })
  role: string;
}