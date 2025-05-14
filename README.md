<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

  
﻿📘 Documentación API - Pronto Medicina
# **📌 Descripción General**
Pronto Medicina es una API que permite gestionar citas médicas entre pacientes y doctores. Incluye autenticación por roles (paciente y doctor) y flujo de pagos con confirmación de cita.

## Project setup

```bash
$ docker-compose up -d
$ npm install
$ npm run start:dev
```
Si no ocupas docker debes tener postgrest y crear una base de datos llamada "prontoDB"

# **🔐 Autenticación**
Endpoint: POST api/auth/login

Cuerpo de la solicitud (JSON):

***{
`  `"username": "doctor1",
`  `"password": "123456"
}***

ó

***{
`  `"username": "paciente1",
`  `"password": "123456"
}***

Respuesta:

***{
`  `"access\_token": "<JWT>"
}***

Este token debe enviarse en el encabezado de todas las solicitudes protegidas como:

***Authorization: Bearer <access\_token>***
# **📅 Crear cita médica**
Endpoint: POST api/appointments

🔒 Requiere autenticación con token JWT del paciente.

Cuerpo de la solicitud (JSON):

***{
`  `"patient\_id": 3,
`  `"doctor\_id": 3,
`  `"reason": "dolor espalda",
`  `"appointment\_date": "2025-05-11 11:30:46",
`  `"amount": 5500
}***

Respuesta:

***{
`  `"id": 23,
`  `"doctor": {
`    `"id": 3,
`    `"user\_id": 3,
`    `"rut": "15.789.456-3",
`    `"name": "Sofía González Núñez",
`    `"specialty": "Dermatología",
`    `"createdAt": "2025-05-13T22:32:20.334Z",
`    `"updatedAt": "2025-05-13T22:32:20.334Z",
`    `"enabled": false
`  `},
`  `"appointment\_date": "2025-05-11 11:00:46",
`  `"amount": 5500,
`  `"reason": "dolor espalda",
`  `"paid": false,
`  `"confirmed": false,
`  `"active": true,
`  `"createdAt": "2025-05-13T23:25:20.020Z",
`  `"updatedAt": "2025-05-13T23:25:20.020Z"
}***

La cita se crea con estado "por pagar y confirmar".
# **📄 Obtener cita(s)**
Obtener cita por ID: GET api/appointments/:id

Listar todas las citas: GET api/appointments

🔒 Requiere token válido.
# **💳 Pagar cita médica**
Endpoint: GET api/payment/pay/:appointmentId

🔒 Requiere autenticación con token JWT del paciente.

Este endpoint redirige a una pasarela de pago (WebPay) con datos de prueba.

Puedes usar tarjetas de prueba disponibles en el portal de Transbank.
# **✅ Confirmar cita (solo doctor)**
Endpoint: PATCH api/appointments/confirm/:appointmentId

🔒 Solo accesible por usuarios con rol doctor.
# **📚 Endpoints adicionales**

|Función|Método|Endpoint|Requiere Token|
| :- | :- | :- | :- |
|Obtener citas por doctor|GET|api/appointments/doctor/:doctorId|✅ Sí|
|Listar/crear pacientes|GET/POST|api/patient|✅ Sí|
|Listar/crear doctores|GET/POST|api/doctors|✅ Sí|
|Listar pagos|GET|api/payments|✅ Sí|
# **🧪 Credenciales de prueba**

|Usuario|Rol|Contraseña|
| :- | :- | :- |
|doctor1|doctor|123456|
|paciente1|paciente|123456|
