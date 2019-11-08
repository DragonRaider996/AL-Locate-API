import { Controller, Post, Body } from '@nestjs/common';
import { HospitalService } from './hospital.service';
import { LocationDTO } from './dto/location.dto';
import { HospitalInterface } from './interface/listHospital.interface';

@Controller('hospital')
export class HospitalController {

  constructor(private readonly hospitalService: HospitalService) { }

  @Post()
  getHospitals(@Body() location: LocationDTO): Promise<HospitalInterface[]> {
    return this.hospitalService.getHospitalList(location);
  }

}
