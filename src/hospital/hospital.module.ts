import { Module, NestModule, RequestMethod } from '@nestjs/common';
import { HospitalController } from './hospital.controller';
import { HospitalService } from './hospital.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hospital } from './entity/hospital.entity';
import { AmbulanceAuthenticationMiddleware } from '../login/ambulanceAuth.middleware';
import { HospitalAuthenticationMiddleware } from '../login/hospitalAuth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Hospital])],
  controllers: [HospitalController],
  providers: [HospitalService],
  exports: [HospitalService]
})
export class HospitalModule implements NestModule {

  configure(consumer: import("@nestjs/common").MiddlewareConsumer) {
    consumer.apply(AmbulanceAuthenticationMiddleware).forRoutes(
      { path: 'hospital', method: RequestMethod.POST },
      { path: 'hospital/:id', method: RequestMethod.PUT })
    consumer.apply(HospitalAuthenticationMiddleware).forRoutes(
      { path: 'hospital/stats', method: RequestMethod.GET }
    )
  }

}
