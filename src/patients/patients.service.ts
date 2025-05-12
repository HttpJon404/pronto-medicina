import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './entities/patient.entity';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}

  findAll() {
    return this.patientRepository.find();
  }

  create(data: Partial<Patient>) {
    const patient = this.patientRepository.create(data);
    return this.patientRepository.save(patient);
  }
}
