import { Test, TestingModule } from '@nestjs/testing';
import { DoctorsController } from './doctors.controller';
import { DoctorsService } from './doctors.service';
import { AuthGuard } from '@nestjs/passport';
import { Doctor } from './entities/doctor.entity';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

describe('DoctorsController', () => {
  let controller: DoctorsController;
  let service: DoctorsService;

  const mockDoctor: Doctor = {
    id: 1,
    user_id: 123,
    rut: '12345678-9',
    name: 'Dr. John Doe',
    specialty: 'Cardiology',
    createdAt: new Date(),
    updatedAt: new Date(),
    enabled: true
  };

  const createDoctorDto: CreateDoctorDto = {
    user_id: 123,
    rut: '12345678-9',
    name: 'Dr. John Doe',
    specialty: 'Cardiology'
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoctorsController],
      providers: [
        {
          provide: DoctorsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([mockDoctor]),
            create: jest.fn().mockImplementation((dto) => 
              Promise.resolve({
                id: 1,
                ...dto,
                createdAt: new Date(),
                updatedAt: new Date(),
                enabled: true
              })
            ),
          },
        },
        {
          provide: APP_PIPE,
          useClass: ValidationPipe, // Para probar la validación del DTO
        },
      ],
    })
    .overrideGuard(AuthGuard('jwt'))
    .useValue({ canActivate: () => true })
    .compile();

    controller = module.get<DoctorsController>(DoctorsController);
    service = module.get<DoctorsService>(DoctorsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('GET /doctors', () => {
    it('should return an array of doctors', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([mockDoctor]);
      expect(service.findAll).toHaveBeenCalled();
    });

    it('should return doctors with correct structure', async () => {
      const result = await controller.findAll();
      expect(result[0]).toHaveProperty('id');
      expect(result[0]).toHaveProperty('name');
      expect(result[0]).toHaveProperty('specialty');
      expect(result[0]).toHaveProperty('createdAt');
      expect(result[0]).toHaveProperty('enabled', true);
    });
  });

  describe('POST /doctors', () => {
    it('should create a new doctor', async () => {
      const result = await controller.create(createDoctorDto);
      
      expect(result).toEqual({
        id: expect.any(Number),
        ...createDoctorDto,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        enabled: true
      });
      expect(service.create).toHaveBeenCalledWith(createDoctorDto);
    });

    it('should call service with correct DTO', async () => {
      await controller.create(createDoctorDto);
      
      expect(service.create).toHaveBeenCalledWith({
        user_id: 123,
        rut: '12345678-9',
        name: 'Dr. John Doe',
        specialty: 'Cardiology'
      });
    });

  });
});