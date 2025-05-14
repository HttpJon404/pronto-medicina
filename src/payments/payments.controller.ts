import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Response } from 'express';
import { RolesGuard } from '../auth/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/roles.decorator';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) { }

  //Endpoint para crear pago transbank y retornar pasarela de pago web
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('paciente')
  @Post('pay/:id')
  async getPaymentPage(
    @Param('id') id: number,
    @Res() res: Response
  ) {
    try {
      // Obtener datos de la cita (simulado)
      const data = await this.paymentsService.pay(id)
      console.log({ data });
      // Renderizar template con datos
      return res.render('pay', data)
    } catch (error) {
      // Renderizar template de error
      return res.render('paymentRes', {titulo:'Ha ocurrido un error, intente mas tarde'});
    }
  }

  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  // aqui retorna transabank una vez se realiza el flujo de la pasarela de pago.
  @Get('return')
  async handleWebpayReturn(@Body() body, @Query() query, @Res() res: Response) {
    const token = query.token_ws;
    // Confirmar transacción con Transbank
    const result = await this.paymentsService.confirmTransaction(token);

    if (result.status === 'AUTHORIZED') {
      return res.render('paymentRes', { titulo: 'Pago de cita médica exitoso' });
    } else {
      return res.render('paymentRes', { titulo: 'Pago de cita médica rechazado, intente mas tarde.' });
    }
  }


  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.paymentsService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentsService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentsService.update(+id, updatePaymentDto);
  }
  
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentsService.remove(+id);
  }
}
