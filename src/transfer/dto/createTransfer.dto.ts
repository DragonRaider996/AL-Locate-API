import { IsNotEmpty } from 'class-validator';

export class CreateTransferDTO {

  @IsNotEmpty()
  toHospital: number;

  @IsNotEmpty()
  patientName: string;

  @IsNotEmpty()
  patientAge: number;

}
