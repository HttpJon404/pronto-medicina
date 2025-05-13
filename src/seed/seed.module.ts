import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import { Appointment } from 'src/appointments/entities/appointment.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Doctor,Patient,Appointment])],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
