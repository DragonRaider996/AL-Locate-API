import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Transfer } from './transfer.entity';

@Entity("track")
export class Track {

  @PrimaryGeneratedColumn({ name: "track_id" })
  trackId?: number;

  @OneToOne(() => Transfer)
  @JoinColumn({
    name: "transfer_id",
    referencedColumnName: "transferId"
  })
  transferId: Transfer;

  @Column({ name: "ambulance_id", nullable: true })
  ambulanceId?: number;

  @Column({ name: "latitude", nullable: true })
  latitude?: number;

  @Column({ name: "longitude", nullable: true })
  longitude?: number;

}