import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HospitalModule } from './hospital/hospital.module';
import { TransferModule } from './transfer/transfer.module';
import { Transfer } from './transfer/entity/transfer.entity';
import { Hospital } from './hospital/entity/hospital.entity';

@Module({
  imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([Transfer, Hospital]), LoginModule, HospitalModule, TransferModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
