import { Body, Controller, Get, Post } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { Doctor } from './entities/doctor.entity';
import { CreateDoctorDto } from './dto/create-doctor.dto';

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Get()
  findAll(): Promise<Doctor[]> {
    return this.doctorsService.findAll();
  }

  @Post()
  create(@Body() data: CreateDoctorDto) {
    return this.doctorsService.create(data);
  }
}
