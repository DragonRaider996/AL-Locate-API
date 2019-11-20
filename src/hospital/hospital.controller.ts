import { Controller, Post, Body, Put, Param, HttpException, HttpStatus, Query, Get } from '@nestjs/common';
import { HospitalService } from './hospital.service';
import { LocationDTO } from './dto/location.dto';
import { HospitalInterface } from './interface/listHospital.interface';
import { UpdateHospitalDTO } from './dto/updateHospital.dto';
import { Hospital } from './entity/hospital.entity';
import { HospitalStatsInterface } from './interface/hospitalStats.interface';
import { UserInterface } from 'src/login/interface/user.interface';
import { User } from 'src/login/user.decorator';

@Controller('hospital')
export class HospitalController {

  constructor(private readonly hospitalService: HospitalService) { }

  @Post()
  getHospitals(@Body() location: LocationDTO): Promise<HospitalInterface[]> {
    return this.hospitalService.getHospitalList(location);
  }

  @Put("/:id")
  async updateHospital(@Body() updateDetais: UpdateHospitalDTO, @Param("id") id: number): Promise<Hospital> {
    let updatedHopsital: Hospital = await this.hospitalService.updateHospitalDetails(id, updateDetais);
    if (updatedHopsital) {
      return updatedHopsital;
    } else {
      throw new HttpException("Error", HttpStatus.BAD_REQUEST);
    }
  }

  @Get("/stats")
  async getHospitalStats(@User() user: UserInterface): Promise<HospitalStatsInterface> {
    return this.hospitalService.getHospitalStats(user.userId);
  }

}
