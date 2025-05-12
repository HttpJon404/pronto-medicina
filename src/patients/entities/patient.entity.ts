import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity('patients')
  export class Patient {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    user_id: number;
  
    @Column()
    rut: string;
  
    @Column()
    names: string;
  
    @Column()
    last_names: string;
  
    @Column()
    email: string;
  
    @Column()
    phone: string;
  
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
  
    @Column({ default: true })
    enabled: boolean;
  }
  