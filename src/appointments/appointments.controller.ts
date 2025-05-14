import { Controller, Post, Body, UsePipes, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { AppointmentValidationPipe } from './pipes/appointment-validation.pipe';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('doctor')
  @Get()
  findAll() {
    return this.appointmentsService.findAll();
  }
  
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('doctor')
  @Post('confirm/:id')
  appointmentConfirmByDoctor( @Param( 'id' ) id: number ) {
    return this.appointmentsService.appointmentConfirmByDoctor(id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('doctor')
  @Get('/doctor/:doctorId')
  findBydoctor(
    @Query() paginationDto:PaginationDto,
    @Param( 'doctorId' ) doctorId: number){
    return this.appointmentsService.findByDoctorId(doctorId, paginationDto)
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post()
  @UsePipes(AppointmentValidationPipe)
  async create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentsService.findOneDetail(+id);
  }
}
