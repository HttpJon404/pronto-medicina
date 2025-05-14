import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { Appointment } from './entities/appointment.entity';
import { Doctor } from '../doctors/entities/doctor.entity';
import { Patient } from '../patients/entities/patient.entity';
import { PaymentsModule } from '../payments/payments.module';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, Doctor, Patient]) , forwardRef(() => PaymentsModule)  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
  exports:[AppointmentsService]
})
export class AppointmentsModule {}