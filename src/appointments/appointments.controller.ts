import { Controller, Post, Body, UsePipes, Get, Param, Query } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { AppointmentValidationPipe } from './pipes/appointment-validation.pipe';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Get()
  findAll() {
    return this.appointmentsService.findAll();
  }

  @Post('confirm/:id')
  appointmentConfirmByDoctor( @Param( 'id' ) id: number ) {
    return this.appointmentsService.appointmentConfirmByDoctor(id);
  }

  @Post('payment-init/:id')
  paymentAppointment( @Param( 'id' ) id: number ) {
    return this.appointmentsService.payment(id);
  }

  @Get('/doctor/:doctorId')
  findBydoctor(
    @Query() paginationDto:PaginationDto,
    @Param( 'doctorId' ) doctorId: number){
    return this.appointmentsService.findByDoctorId(doctorId, paginationDto)
  }


  @Post()
  @UsePipes(AppointmentValidationPipe)
  async create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }

}
