import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from './entities/doctor.entity';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
  ) {}

  findAll() {
    return this.doctorRepository.find();
  }

  create(data: Partial<Doctor>) {
    const doctor = this.doctorRepository.create(data);
    return this.doctorRepository.save(doctor);
  }
}
