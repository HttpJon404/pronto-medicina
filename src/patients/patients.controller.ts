import { Controller, Get, Post, Body } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { Patient } from './entities/patient.entity';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get()
  findAll(): Promise<Patient[]> {
    return this.patientsService.findAll();
  }

  @Post()
  create(@Body() data: CreatePatientDto) {
    return this.patientsService.create(data);
  }
}
