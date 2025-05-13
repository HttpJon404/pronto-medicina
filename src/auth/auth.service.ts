import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  private readonly users = [
    {
      id: 1,
      username: 'doctor1',
      password: bcrypt.hashSync('123456', 10), // Contraseña encriptada
      role: 'doctor',
    },
    {
      id: 2,
      username: 'paciente1',
      password: bcrypt.hashSync('123456', 10),
      role: 'paciente',
    },
  ];

  async validateUser(username: string, password: string) {
    const user = this.users.find((u) => u.username === username);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result; // Sin la contraseña
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
