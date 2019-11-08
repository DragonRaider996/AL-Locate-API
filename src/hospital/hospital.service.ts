import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getDistance } from 'geolib';
import { Hospital } from './entity/hospital.entity';
import { Repository } from 'typeorm';
import { LocationDTO } from './dto/location.dto';
import { HospitalInterface } from './interface/listHospital.interface';


@Injectable()
export class HospitalService {
  private hospitals: Hospital[]
  private hospitalData: HospitalInterface[]

  constructor(@InjectRepository(Hospital) private hospitalRepository: Repository<Hospital>) { }

  async getHospitalList(location: LocationDTO): Promise<HospitalInterface[]> {

    this.hospitals = await this.hospitalRepository.find();
    console.log(this.hospitals);
    this.hospitals.forEach((hospital) => {
      let distance: number = this.getHospitalDistance(hospital, location);
      let averageWaitingTime: number = this.getWaitingTime(hospital, distance);
      console.log(averageWaitingTime);
    })
    return this.hospitalData;
  }

  private getHospitalDistance(hospital: Hospital, location: LocationDTO) {
    let distanceHospital = {
      "latitude": hospital.hlat,
      "longitude": hospital.hlong
    }
    return getDistance(location, distanceHospital);
  }

  private getWaitingTime(hospital: Hospital, distance: number): number {
    let date: Date = new Date();
    let currentTime: number = date.getHours() * 60 + date.getMinutes();
    let averageOutgoingTime: number = currentTime / hospital.outgoingPatient;
    let averagePatientWaitingTime: number = averageOutgoingTime * hospital.waitingPatient;
    let reachingTime: number = distance / ((40 * 1000) / 60);
    let averageWaitingTime = averagePatientWaitingTime + reachingTime;
    return averageWaitingTime;
  }

}
