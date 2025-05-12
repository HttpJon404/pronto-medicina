
import { forwardRef, Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { AppointmentsModule } from 'src/appointments/appointments.module';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService],
  exports: [PaymentsService],
  imports: [TypeOrmModule.forFeature([Payment]), forwardRef(() => AppointmentsModule)  ],
  
})
export class PaymentsModule {}
