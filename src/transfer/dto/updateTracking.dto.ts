import { IsNotEmpty } from 'class-validator';

export class UpdateTrackingDTO {

  @IsNotEmpty()
  latitude: number;

  @IsNotEmpty()
  longitude: number;

}
