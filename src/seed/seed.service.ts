import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from 'src/doctors/entities/doctor.entity';

import { initialData } from './data/initial-data';
import { Patient } from '../patients/entities/patient.entity';
import { Appointment } from '../appointments/entities/appointment.entity';

@Injectable()
export class SeedService {
  constructor(private dataSource: DataSource,
    @InjectRepository(Doctor)
    private doctorRepo: Repository<Doctor>,
    @InjectRepository(Patient)
    private patientRepo: Repository<Patient>,
    @InjectRepository(Appointment)
    private appointmentRepo: Repository<Appointment>,
  ) { }
  async runSeed() {
    await this.dataSource.query('TRUNCATE TABLE appointments RESTART IDENTITY CASCADE');
    await this.dataSource.query('TRUNCATE TABLE doctors RESTART IDENTITY CASCADE');
    await this.dataSource.query('TRUNCATE TABLE patients RESTART IDENTITY CASCADE');
    await this.insertData()
    return `SEED EXECUTED`;

  }


  private async insertData() {
    const doctors = initialData.doctors
    const patients = initialData.patients
    const appointments = initialData.appointments
    for (const doctor of doctors) {
      const newDoctor = this.doctorRepo.create(doctor);
      await this.doctorRepo.save(newDoctor);
    }
    console.log('DOCTORES CREADOS CORRECTAMENTE');

    for (const patient of patients) {
      const newPat = this.patientRepo.create(patient);
      await this.patientRepo.save(newPat);
    }
    console.log('PACIENTES CREADOS CORRECTAMENTE');

    for (const appoint of appointments) {

      const newAppoint = this.appointmentRepo.create({
        ...appoint,
        patient: { id: appoint.patient_id },
        doctor: { id: appoint.doctor_id }
      });
      await this.appointmentRepo.save(newAppoint);
    }
    console.log('CITAS CREADAS CORRECTAMENTE');


    return { message: 'Se insertaron los doctores correctamente.' };


  }

}
