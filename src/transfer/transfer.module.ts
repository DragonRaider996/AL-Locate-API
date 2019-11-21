import { Module, NestModule, RequestMethod } from '@nestjs/common';
import { TransferController } from './transfer.controller';
import { TransferService } from './transfer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transfer } from './entity/transfer.entity';
import { HospitalModule } from '../hospital/hospital.module';
import { Track } from './entity/track.entity';
import { AmbulanceAuthenticationMiddleware } from '../login/ambulanceAuth.middleware';
import { HospitalAuthenticationMiddleware } from '../login/hospitalAuth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Transfer, Track]), HospitalModule],
  controllers: [TransferController],
  providers: [TransferService]
})
export class TransferModule implements NestModule {

  configure(consumer: import("@nestjs/common").MiddlewareConsumer) {
    consumer.apply(AmbulanceAuthenticationMiddleware).forRoutes(
      { path: 'transfer/track/:id', method: RequestMethod.POST },
      { path: 'transfer/:id', method: RequestMethod.GET })
    consumer.apply(HospitalAuthenticationMiddleware).forRoutes(
      { path: 'transfer', method: RequestMethod.GET },
      { path: 'transfer', method: RequestMethod.POST },
      { path: 'transfer/track/:id', method: RequestMethod.GET }
    )
  }

}
