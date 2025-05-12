import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { IntegrationApiKeys, WebpayPlus } from 'transbank-sdk';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Repository } from 'typeorm';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { AppointmentsService } from 'src/appointments/appointments.service';

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
    console.log('pay', 'id', id, { appointment, payment });
    return { appointment, payment }
  }



  async pay(id) {
    const appointment = await this.appointmentsService.findOneDetail(id)
    const payment = await this.initTransaction(appointment)
    // const payment = await this.findByAppointmentId(id)
    console.log('pay', 'id', id, { appointment, payment });
    return { appointment, payment }
  }
async confirmTransaction(token: string) {
    try {
      console.log('confirmTransaction');
      const result = await this.trbnk.commit(token);
      console.log('confirmTransaction',{result});
      // Aquí puedes guardar el resultado en tu DB si lo deseas
      // Por ejemplo: actualizar el payment con status y paid_at

      return result;
    } catch (error) {
      console.error('Error confirmando transacción:', error);
      throw error;
    }
  }


  async initTransaction(appointment: Appointment | any) {
    console.log('iniciar proceso transbank', appointment);
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

  create(createPaymentDto: CreatePaymentDto) {
    return 'This action adds a new payment';
  }

  findAll() {
    return `This action returns all payments`;
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

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
