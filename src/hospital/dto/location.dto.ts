import { IsNotEmpty } from 'class-validator';

export class LocationDTO {

  @IsNotEmpty()
  latitude: number;

  @IsNotEmpty()
  longitude: number;

}
