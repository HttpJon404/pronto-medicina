import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { AppointmentsService } from '../appointments/appointments.service';
import { AppointmentsController } from './appointments.controller';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

describe('AppointmentsController', () => {
  let controller: AppointmentsController;
  let service: AppointmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppointmentsController],
      providers: [
        AppointmentsService,
        {
          provide: getRepositoryToken(Appointment),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<AppointmentsController>(AppointmentsController);
    service = module.get<AppointmentsService>(AppointmentsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new appointment', async () => {
      const createDto: CreateAppointmentDto = {
        patient_id: 1,
        doctor_id: 1,
        amount: 100,
        appointment_date: '2023-12-31T10:00:00Z',
        reason: 'Consulta general',
      };

      const result = {
        id: 1,
        ...createDto,
        paid: false,
        confirmed: false,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'create').mockImplementation(async () => result);

      expect(await controller.create(createDto)).toBe(result);
      expect(service.create).toHaveBeenCalledWith(createDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of appointments', async () => {
      const result = [
        {
          id: 1,
          patient_id: 1,
          doctor_id: 1,
          amount: 100,
          appointment_date: new Date('2023-12-31T10:00:00Z'),
          reason: 'Consulta general',
          paid: false,
          confirmed: false,
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      jest.spyOn(service, 'findAll').mockImplementation(async () => result);

      expect(await controller.findAll()).toBe(result);
    });
  });
});