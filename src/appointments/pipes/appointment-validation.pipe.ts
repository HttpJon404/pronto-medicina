import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from '../entities/appointment.entity';
import { Repository } from 'typeorm';
import { Patient } from 'src/patients/entities/patient.entity';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { APPOINTMENT_HOURS } from '../constanst/appointment-hours.constant';

@Injectable()
export class AppointmentValidationPipe implements PipeTransform {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
  ) { }

  async transform(value: any) {        
    const { patient_id, doctor_id, appointment_date } = value;

    // Validar que el paciente exista
    const patient = await this.patientRepository.findOneBy({ id: patient_id });
    if (!patient) {
      throw new BadRequestException(`Patient with ID ${patient_id} not found`);
    }

    // Validar que el doctor exista
    const doctor = await this.doctorRepository.findOneBy({ id: doctor_id });
    if (!doctor) {
      throw new BadRequestException(`Doctor with ID ${doctor_id} not found`);
    }

    value.doctor= doctor
    value.patiente= patient

    // Validar la hora de la cita
    const date = new Date(appointment_date);
    const hour = date.getHours();
    const minutes = date.getMinutes();

    if (minutes !== 0 && minutes !== APPOINTMENT_HOURS.BLOCK_MINUTES) {
      throw new BadRequestException(
        `Las citas deben agendarse cada ${APPOINTMENT_HOURS.BLOCK_MINUTES} minutos (ej. 09:00, 09:30...)`,
      );
    }
    const isMorning =
      hour >= APPOINTMENT_HOURS.MORNING.start && hour < APPOINTMENT_HOURS.MORNING.end;

    const isAfternoon =
      hour >= APPOINTMENT_HOURS.AFTERNOON.start && hour < APPOINTMENT_HOURS.AFTERNOON.end;

    if (!(isMorning || isAfternoon)) {
      throw new BadRequestException(
        `Las citas solo pueden agendarse entre ${APPOINTMENT_HOURS.MORNING.start}:00–${APPOINTMENT_HOURS.MORNING.end}:00 y ${APPOINTMENT_HOURS.AFTERNOON.start}:00–${APPOINTMENT_HOURS.AFTERNOON.end}:00`,
      );
    }
    return value;



   }
}
