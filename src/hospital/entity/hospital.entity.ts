import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("hospital")
export class Hospital {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: "250" })
  name: string;

  @Column({ type: "varchar", length: "500" })
  address: string;

  @Column({ type: "double" })
  hlat: number;

  @Column({ type: "double" })
  hlong: number;

  @Column({ type: "int" })
  capacity: number;

  @Column({ type: "int", name: "outgoing_patient" })
  outgoingPatient: number;

  @Column({ type: "int", name: "waiting_patient" })
  waitingPatient: number;

  @Column({ type: "int", name: "admitted_patient" })
  admittedPatient: number;
}