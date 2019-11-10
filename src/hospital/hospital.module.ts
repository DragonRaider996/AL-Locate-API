import { Module, NestModule, RequestMethod } from '@nestjs/common';
import { HospitalController } from './hospital.controller';
import { HospitalService } from './hospital.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hospital } from './entity/hospital.entity';
import { AuthenticationMiddleware } from '../login/auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Hospital])],
  controllers: [HospitalController],
  providers: [HospitalService]
})
export class HospitalModule implements NestModule {

  configure(consumer: import("@nestjs/common").MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes({ path: 'hospital', method: RequestMethod.POST })
  }

}
