import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HospitalModule } from './hospital/hospital.module';

@Module({
  imports: [TypeOrmModule.forRoot(), LoginModule, HospitalModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
