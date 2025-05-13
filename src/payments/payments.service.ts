import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { IntegrationApiKeys, WebpayPlus } from 'transbank-sdk';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Repository } from 'typeorm';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { AppointmentsService } from 'src/appointments/appointments.service';
import { UpdateAppointmentDto } from 'src/appointments/dto/update-appointment.dto ';

@Injectable()
export class PaymentsService {

  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @Inject(forwardRef(() => AppointmentsService))
    private readonly appointmentsService: AppointmentsService

  ) { }

  private trbnk = WebpayPlus.Transaction.buildForIntegration('597055555532', IntegrationApiKeys.WEBPAY)


  async payOrder(id) {
    const appointment = await this.appointmentsService.findOneDetail(id)
    const payment = await this.initTransaction(appointment)
    // const payment = await this.findByAppointmentId(id)
    return { appointment, payment }
  }



  async pay(id) {
    const appointment = await this.appointmentsService.findOneDetail(id)
    const payment = await this.initTransaction(appointment)
    // const payment = await this.findByAppointmentId(id)
    return { appointment, payment }
  }

  //Revisar estado de la transaccion y actualizar datos
  async confirmTransaction(token: string) {
    try {
      const result = await this.trbnk.commit(token);

      const payment = await this.paymentRepository.findOne({
        where: { transbankToken: token },
        relations: ['appointment']

      })
      if (!payment) {
        throw new NotFoundException(`Pago no encontrado`);
      }

      //Actualiza estado de payment
      const dataUpdate: UpdatePaymentDto = {
        status: result.status
      }

      if (result.status === 'AUTHORIZED') {
        //Agregar fecha de pago y paid:true
        dataUpdate.paidAt = new Date()
        const appointmentUpdate: UpdateAppointmentDto = {
          paid: true
        }
        this.appointmentsService.update(payment.appointment.id, appointmentUpdate)
      }
      Object.assign(payment, dataUpdate);
      this.paymentRepository.save(payment);

      return payment;
    } catch (error) {
      console.error('Error confirmando transacción:', error);
      throw error;
    }
  }


  // Inicia transaccion de transabank y guarda registro payment en la DB del proyecto
  async initTransaction(appointment: Appointment | any) {
    console.log('iniciar proceso transbank');
    const buyOrder = Math.floor(Math.random() * 1000000).toString();
    const sessionId = Math.floor(Math.random() * 1000000).toString();
    const amount: number = appointment.amount
    const returnUrl = `http://localhost:3000/payments/return`; // URL de retorno después del pago

    const resp = await this.trbnk.create(
      buyOrder,
      sessionId,
      amount,
      returnUrl
    )

    const payment = this.paymentRepository.create({
      amount,
      appointment: { id: appointment.id },
      transbankToken: resp.token,
      status: 'pending'
    });
    return this.paymentRepository.save(payment)
  }

  async findOne(id: number) {
    return await this.paymentRepository.findOneBy({ id })
  }

  async findByAppointmentId(id: number) {
    return await this.paymentRepository.findOne({
      where: {
        appointment: {
          id
        }
      }
    })
  }

  create(createPaymentDto: CreatePaymentDto) {
    return 'This action adds a new payment';
  }

  findAll() {
    return `This action returns all payments`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }

}
