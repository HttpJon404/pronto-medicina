import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { Patient } from './entities/patient.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}
  
  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(): Promise<Patient[]> {
    return this.patientsService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() data: CreatePatientDto) {
    return this.patientsService.create(data);
  }
}
