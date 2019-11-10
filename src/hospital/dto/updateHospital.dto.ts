import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateHospitalDTO {

  @IsNumber()
  outgoingPatient?: number;

  @IsNumber()
  waitingPatient?: number;

  @IsNumber()
  admittedPatient?: number;

}
