import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { Patient } from '../patients/entities/patient.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { Doctor } from '../doctors/entities/doctor.entity';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { PaymentsService } from '../payments/payments.service';
import { UpdateAppointmentDto } from './dto/update-appointment.dto ';
@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
    private readonly paymentsService: PaymentsService

  ) { }


  async create2(createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    const appointment = this.appointmentRepository.create(createAppointmentDto);
    return this.appointmentRepository.save(appointment);
  }

  async findAll2(): Promise<Appointment[]> {
    return this.appointmentRepository.find();
  }

  findAll() {
    return this.appointmentRepository.find({
      relations: ['patient', 'doctor'],
    });
  }

  // Busca las citas del doctor
  async findByDoctorId(doctorId: number, paginationDto: PaginationDto) {
    const { limit = 5, offset = 0 } = paginationDto;
    const appointments = await this.appointmentRepository.find({
      take: limit,
      skip: offset,
      where: {
        active: true,
        doctor: { id: doctorId }
      },
    });

    return appointments
  }

  async appointmentConfirmByDoctor(id: number) {
    const appointment = await this.appointmentRepository.findOneBy({ id })

    if (!appointment?.paid) {
      throw new BadRequestException(
        `No se puede conﬁrmar una cita que no ha sido pagada.`,
      );
    }
    const updateAppoint: UpdateAppointmentDto = {
      confirmed: true
    }

    return await this.update(id, updateAppoint)
  }

  // Endpoint para crear pago y posteriormente confirmarlo
  async payment(id: number) {
    const appointment = await this.appointmentRepository.findOneBy({ id })
    console.log(appointment);
    if (!appointment) {
      throw new BadRequestException(
        `La cita no existe`,
      );
    }
    //Proceso de pago
    const resp = this.paymentsService.initTransaction(appointment)
    return resp
  }

  async create(data: CreateAppointmentDto) {
    const { doctor_id, appointment_date } = data;
    // Verificar que no exista ya una cita para el doctor en ese horario
    const existingAppointment = await this.appointmentRepository.findOne({
      where: {
        doctor: { id: doctor_id },
        appointment_date: new Date(appointment_date),
      },
    });
    if (existingAppointment) {
      throw new BadRequestException(
        `El doctor ya tiene una cita agendada para ese horario`,
      );
    }
    // Crear la cita
    const appointment = this.appointmentRepository.create(data);
    return this.appointmentRepository.save(appointment);
  }

  async findOne(id: number) {
    return this.appointmentRepository.findOneBy({ id })
  }

  async findOneDetail(id: number) {
    return await this.appointmentRepository.findOne({
      where: { id },
      relations: ['patient', 'doctor'],
    });
  }

  async update(id: number, updateDto: UpdateAppointmentDto) {
    const appointment = await this.appointmentRepository.findOne({
      where: { id },
    });
    if (!appointment) {
      throw new NotFoundException(`Appointment con ID ${id} no encontrado`);
    }
    Object.assign(appointment, updateDto);
    return await this.appointmentRepository.save(appointment);
  }
}
