import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Hospital } from '../../hospital/entity/hospital.entity';

@Entity("transfer")
export class Transfer {

  @PrimaryGeneratedColumn({ name: "transfer_id" })
  transferId?: number;

  @OneToOne(() => Hospital)
  @JoinColumn({
    name: "from_hospital",
    referencedColumnName: "id"
  })
  fromHospital: Hospital;

  @OneToOne(() => Hospital)
  @JoinColumn({
    name: "to_hospital",
    referencedColumnName: "id"
  })
  toHospital: Hospital;

  @Column({ name: "patient_name" })
  patientName: string;

  @Column({ name: "patient_age" })
  patientAge: number;

}