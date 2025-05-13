export const initialData: any = {


    doctors: [
        {
            "user_id": 1,
            "rut": "12.345.678-9",
            "name": "María Fernanda Pérez",
            "specialty": "Cardiología",
            "enabled": true
        },
        {
            "user_id": 2,
            "rut": "98.765.432-1",
            "name": "Juan Carlos Ramírez",
            "specialty": "Pediatría",
            "enabled": true
        },
        {
            "user_id": 3,
            "rut": "15.789.456-3",
            "name": "Sofía González Núñez",
            "specialty": "Dermatología",
            "enabled": false
        },
        {
            "user_id": 4,
            "rut": "23.456.789-0",
            "name": "Pedro Ignacio Rojas",
            "specialty": "Traumatología",
            "enabled": true
        },
        {
            "user_id": 5,
            "rut": "17.654.321-4",
            "name": "Camila Martínez Silva",
            "specialty": "Neurología",
            "enabled": true
        },
        {
            "user_id": 6,
            "rut": "33.123.456-2",
            "name": "Andrés Felipe Torres",
            "specialty": "Gastroenterología",
            "enabled": false
        },
        {
            "user_id": 7,
            "rut": "29.876.543-5",
            "name": "Valentina Navarro Riquelme",
            "specialty": "Endocrinología",
            "enabled": true
        },
        {
            "user_id": 8,
            "rut": "11.222.333-6",
            "name": "Cristóbal Herrera Lagos",
            "specialty": "Oncología",
            "enabled": true
        },
        {
            "user_id": 9,
            "rut": "44.555.666-7",
            "name": "Daniela Vega Morales",
            "specialty": "Oftalmología",
            "enabled": false
        },
        {
            "user_id": 10,
            "rut": "66.777.888-8",
            "name": "Felipe Castro Muñoz",
            "specialty": "Psiquiatría",
            "enabled": true
        }
    ],

    patients: [
        {
            "user_id": 11,
            "rut": "11.123.456-7",
            "names": "Ana Isabel",
            "last_names": "Contreras Rivas",
            "email": "ana.contreras@example.com",
            "phone": "+56912345678",
            "enabled": true
        },
        {
            "user_id": 12,
            "rut": "22.234.567-8",
            "names": "Luis Alberto",
            "last_names": "Fuentes Navarro",
            "email": "luis.fuentes@example.com",
            "phone": "+56923456789",
            "enabled": true
        },
        {
            "user_id": 13,
            "rut": "33.345.678-9",
            "names": "María José",
            "last_names": "Lagos Silva",
            "email": "maria.lagos@example.com",
            "phone": "+56934567890",
            "enabled": false
        },
        {
            "user_id": 14,
            "rut": "44.456.789-0",
            "names": "Pedro Esteban",
            "last_names": "Gallardo Soto",
            "email": "pedro.gallardo@example.com",
            "phone": "+56945678901",
            "enabled": true
        },
        {
            "user_id": 15,
            "rut": "55.567.890-1",
            "names": "Camila Andrea",
            "last_names": "Vera Espinoza",
            "email": "camila.vera@example.com",
            "phone": "+56956789012",
            "enabled": true
        },
        {
            "user_id": 16,
            "rut": "66.678.901-2",
            "names": "Jorge Enrique",
            "last_names": "Muñoz Herrera",
            "email": "jorge.munoz@example.com",
            "phone": "+56967890123",
            "enabled": false
        },
        {
            "user_id": 17,
            "rut": "77.789.012-3",
            "names": "Francisca Belén",
            "last_names": "Reyes Araya",
            "email": "francisca.reyes@example.com",
            "phone": "+56978901234",
            "enabled": true
        },
        {
            "user_id": 18,
            "rut": "88.890.123-4",
            "names": "Rodrigo Andrés",
            "last_names": "Cáceres Molina",
            "email": "rodrigo.caceres@example.com",
            "phone": "+56989012345",
            "enabled": true
        },
        {
            "user_id": 19,
            "rut": "99.901.234-5",
            "names": "Fernanda Valeria",
            "last_names": "Salazar Guzmán",
            "email": "fernanda.salazar@example.com",
            "phone": "+56990123456",
            "enabled": false
        },
        {
            "user_id": 20,
            "rut": "10.012.345-6",
            "names": "Matías Ignacio",
            "last_names": "Riquelme Vargas",
            "email": "matias.riquelme@example.com",
            "phone": "+56901234567",
            "enabled": true
        },
        {
            "user_id": 21,
            "rut": "20.123.456-7",
            "names": "Daniela Paz",
            "last_names": "Ortiz Contreras",
            "email": "daniela.ortiz@example.com",
            "phone": "+56912345679",
            "enabled": true
        },
        {
            "user_id": 22,
            "rut": "30.234.567-8",
            "names": "Felipe Tomás",
            "last_names": "Aravena León",
            "email": "felipe.aravena@example.com",
            "phone": "+56923456780",
            "enabled": true
        }
    ],

    appointments: [
 {
    "patient_id": 1,
    "doctor_id": 1,
    "appointment_date": "2025-05-15T10:00:00Z",
    "amount": 25000,
    "reason": "Chequeo general",
    "paid": true,
    "confirmed": true,
    "active": true
  },
  {
    "patient_id": 2,
    "doctor_id": 3,
    "appointment_date": "2025-05-16T15:30:00Z",
    "amount": 30000,
    "reason": "Consulta dermatológica",
    "paid": false,
    "confirmed": false,
    "active": true
  },
  {
    "patient_id": 3,
    "doctor_id": 5,
    "appointment_date": "2025-05-17T08:45:00Z",
    "amount": 20000,
    "reason": "Dolor de cabeza persistente",
    "paid": false,
    "confirmed": true,
    "active": true
  },
  {
    "patient_id": 4,
    "doctor_id": 2,
    "appointment_date": "2025-05-18T13:00:00Z",
    "amount": 22000,
    "reason": "Control pediátrico",
    "paid": true,
    "confirmed": true,
    "active": true
  },
  {
    "patient_id": 5,
    "doctor_id": 1,
    "appointment_date": "2025-05-19T09:15:00Z",
    "amount": 27000,
    "reason": "Consulta por hipertensión",
    "paid": false,
    "confirmed": false,
    "active": true
  },
  {
    "patient_id": 6,
    "doctor_id": 4,
    "appointment_date": "2025-05-20T16:30:00Z",
    "amount": 30000,
    "reason": "Evaluación traumatológica",
    "paid": true,
    "confirmed": false,
    "active": true
  },
  {
    "patient_id": 7,
    "doctor_id": 3,
    "appointment_date": "2025-05-21T11:00:00Z",
    "amount": 18000,
    "reason": "Control post-operatorio",
    "paid": true,
    "confirmed": true,
    "active": true
  },
  {
    "patient_id": 8,
    "doctor_id": 6,
    "appointment_date": "2025-05-22T10:45:00Z",
    "amount": 15000,
    "reason": "Consulta por dolor abdominal",
    "paid": false,
    "confirmed": false,
    "active": false
  },
  {
    "patient_id": 9,
    "doctor_id": 7,
    "appointment_date": "2025-05-23T14:30:00Z",
    "amount": 28000,
    "reason": "Revisión endocrina",
    "paid": true,
    "confirmed": true,
    "active": true
  },
  {
    "patient_id": 10,
    "doctor_id": 8,
    "appointment_date": "2025-05-24T09:00:00Z",
    "amount": 25000,
    "reason": "Detección temprana de cáncer",
    "paid": true,
    "confirmed": false,
    "active": true
  },
  {
    "patient_id": 11,
    "doctor_id": 9,
    "appointment_date": "2025-05-25T12:00:00Z",
    "amount": 26000,
    "reason": "Revisión ocular",
    "paid": false,
    "confirmed": false,
    "active": true
  },
  {
    "patient_id": 12,
    "doctor_id": 10,
    "appointment_date": "2025-05-26T13:15:00Z",
    "amount": 32000,
    "reason": "Evaluación psiquiátrica",
    "paid": true,
    "confirmed": true,
    "active": true
  },
  {
    "patient_id": 1,
    "doctor_id": 2,
    "appointment_date": "2025-05-27T08:00:00Z",
    "amount": 19000,
    "reason": "Revisión de fiebre",
    "paid": false,
    "confirmed": true,
    "active": true
  },
  {
    "patient_id": 2,
    "doctor_id": 5,
    "appointment_date": "2025-05-28T17:30:00Z",
    "amount": 21000,
    "reason": "Chequeo neurológico",
    "paid": true,
    "confirmed": true,
    "active": true
  },
  {
    "patient_id": 3,
    "doctor_id": 6,
    "appointment_date": "2025-05-29T10:30:00Z",
    "amount": 23000,
    "reason": "Consulta gastroenterológica",
    "paid": false,
    "confirmed": false,
    "active": true
  },
  {
    "patient_id": 4,
    "doctor_id": 7,
    "appointment_date": "2025-05-30T11:15:00Z",
    "amount": 20000,
    "reason": "Control de tiroides",
    "paid": false,
    "confirmed": true,
    "active": true
  },
  {
    "patient_id": 5,
    "doctor_id": 8,
    "appointment_date": "2025-06-01T09:30:00Z",
    "amount": 26000,
    "reason": "Chequeo preventivo",
    "paid": true,
    "confirmed": true,
    "active": false
  },
  {
    "patient_id": 6,
    "doctor_id": 9,
    "appointment_date": "2025-06-02T15:45:00Z",
    "amount": 24000,
    "reason": "Molestias visuales",
    "paid": false,
    "confirmed": false,
    "active": true
  },
  {
    "patient_id": 7,
    "doctor_id": 10,
    "appointment_date": "2025-06-03T14:00:00Z",
    "amount": 22000,
    "reason": "Ansiedad y estrés",
    "paid": true,
    "confirmed": true,
    "active": true
  },
  {
    "patient_id": 8,
    "doctor_id": 1,
    "appointment_date": "2025-06-04T08:30:00Z",
    "amount": 27000,
    "reason": "Evaluación cardíaca",
    "paid": true,
    "confirmed": false,
    "active": true
  }

    ]

}