import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateHospitalDTO {

  @IsNumber()
  @IsOptional()
  outgoingPatient?: number;

  @IsNumber()
  @IsOptional()
  waitingPatient?: number;

  @IsNumber()
  @IsOptional()
  admittedPatient?: number;

}
