import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("user")
export class User {

  @PrimaryGeneratedColumn()
  id: Number;

  @Column({ type: "varchar", length: "250" })
  username: String;

  @Column({ type: "varchar", length: "250" })
  password: String

}