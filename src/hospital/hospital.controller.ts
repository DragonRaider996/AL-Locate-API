import { Controller, Post, Body } from '@nestjs/common';
import { HospitalService } from './hospital.service';
import { LocationDTO } from './dto/location.dto';

@Controller('hospital')
export class HospitalController {

  constructor(private readonly hospitalService: HospitalService) { }

  @Post()
  getHospitals(@Body() location: LocationDTO) {
    this.hospitalService.getHospitalList(location);
  }

}
