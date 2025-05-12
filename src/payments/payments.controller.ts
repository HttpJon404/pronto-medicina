import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Response } from 'express';
import { AppointmentsService } from 'src/appointments/appointments.service';

@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
    // private readonly appointmentsService: AppointmentsService

  ) { }

  @Get('pay/:id')
  async getPaymentPage(
    @Param('id') id: number,
    @Res() res: Response
  ) {
    try {
      // Obtener datos de la cita (simulado)
      const data = await this.paymentsService.pay(id)
      // console.log({data});
      // Renderizar template con datos
      return res.render('pay', data)

    } catch (error) {
      // Renderizar template de error
      return res.render('payment', {
        appointment: { id },
        amount: 0,
        status: 'error',
        paymentUrl: null
      });
    }
  }



  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }


   @Get('return')
  async handleWebpayReturn(@Body() body, @Query() query,  @Res() res: Response) {
    console.log('return metghos', {body, query});
    const token = query.token_ws;

    // Confirmar transacción con Transbank
    const result = await this.paymentsService.confirmTransaction(token);
    console.log({result});

    if (result.status === 'AUTHORIZED') {
      // Actualizar paid en appointment

      //Cambiar status de transaccion

      // Mostrar vista de éxito
      return res.render('payment', { result });
    } else {
      // Mostrar vista de error
      return res.render('failed', { result });
    }
  }

  @Get('return/:id')
  updateTransaction() {
    // return this.paymentsService.payOrder();
  }

  @Get()
  findAll() {
    return this.paymentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentsService.update(+id, updatePaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentsService.remove(+id);
  }
}
