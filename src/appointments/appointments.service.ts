import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { APPOINTMENT_HOURS } from './constanst/appointment-hours.constant';
import { PaginationDto } from 'src/common/dtos/pagination.dto';


import {
  WebpayPlus,
  IntegrationApiKeys,
  IntegrationCommerceCodes,
} from 'transbank-sdk';
import { PaymentsService } from 'src/payments/payments.service';
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

  findAll() {
    return this.appointmentRepository.find({
      relations: ['patient', 'doctor'],
    });
  }

  async findByDoctorId(doctorId: number, paginationDto: PaginationDto) {
    console.log('nannanana', { doctorId });
    // return this.appointmentRepository.find(doctorId);
    const { limit = 5, offset = 0 } = paginationDto;
    console.log({ limit, offset });
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
    console.log('appointmentConfirmByDoctor,', { id, appointment });

    if (!appointment?.paid) {
      //Confirmar que no esté pagada: si realmente no está pagada -> ejecutar error.
      // Si esta pagada, actualizar pagado y confirmado a true. tambien avisar si ya se encuentra pagada

      throw new BadRequestException(
        `No se puede conﬁrmar una cita que no ha sido pagada.`,
      );
    }
    //Confirmar hora - cambiar confirm : true

    // console.log(appointment);
    // if (!appointment) {
    //   throw new BadRequestException(
    //     `La cita no existe`,
    //   );
    // }
  }

  // Endpoint para crear pago y posteriormente confirmarlo
  async payment(id: number) {
    console.log('payment,', { id });


    const appointment = await this.appointmentRepository.findOneBy({ id })
    console.log(appointment);

    if (!appointment) {
      throw new BadRequestException(
        `La cita no existe`,
      );
    }

    //Proceso de pago
    const resp = this.paymentsService.initTransaction(appointment)

    //Crear transaccion

    // Generar url a endpoint que retorne un template para realizar el pago
    // Ese endpoint debe hacer que la respuesta del pago vaya a un endpoint que guarde que el pago se realizo o no





    // pago existoso





    return resp


    // return await this.appointmentRepository.findOneBy({id});


  }






  async create(data: CreateAppointmentDto) {
    const { doctor_id, appointment_date } = data;
    console.log('create', data);
    // Verificar que no exista ya una cita para el doctor en ese horario
    const existingAppointment = await this.appointmentRepository.findOne({
      where: {
        doctor: { id: doctor_id },
        appointment_date: new Date(appointment_date),
      },
    });
    console.log({ existingAppointment });
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
      relations: ['patient', 'doctor'], // Relacionamos la entidad Appointment con Patient y Doctor
    });
  }

}
