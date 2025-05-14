import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { Doctor } from '../../doctors/entities/doctor.entity'
  import { Patient } from '../../patients/entities/patient.entity'
  
  @Entity('appointments')
  export class Appointment {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => Patient)
    @JoinColumn({ name: 'patient_id' })
    patient: Patient;
  
    @ManyToOne(() => Doctor)
    @JoinColumn({ name: 'doctor_id' })
    doctor: Doctor;
  
    @Column({ type: 'timestamp' })
    appointment_date: Date;

    @Column({default:0})
    amount:number
  
    @Column()
    reason: string;
  
    @Column({ default: false })
    paid: boolean;
  
    @Column({ default: false })
    confirmed: boolean;

    @Column({ default: true })
    active: boolean;
  
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
  }
  