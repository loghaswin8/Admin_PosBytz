import { Controller, Post, Body, Get, Req, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { LoginService } from './login.service'; 
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { RegisterService } from '../register/register.service';

@Controller('login')
export class LoginController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly registerService: RegisterService,
  ) { }

  @Post()
  async loginUser(@Body() loginData: { email: string; password: string }) {
    const { email, password } = loginData;

    try {
      const user = await this.registerService.findByEmail(email); 
      if (!user) {
        throw new UnauthorizedException('Invalid email or password');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid email or password');
      }

      const payload = { userId: user._id, userName: user.name };
      const token = await this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_SECRET_KEY'),
        expiresIn: '1h', 
      });

      return {
        message: 'Login successful',
        token: token,
      };
    } catch (error) {
      console.error('Error in login:', error.message);
      throw new InternalServerErrorException('Login failed');
    }
  }

  @Get('protected')
  async getProtectedData(@Req() req: Request) {
    try {
      const token = req.headers['authorization'];
      if (!token) {
        throw new UnauthorizedException('No token provided');
      }

      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET_KEY'),
      });

      return { 
        message: 'This is protected data', 
        user: { userId: payload.userId, userName: payload.userName } 
      };
    } catch (error) {
      console.error('Access denied:', error.message);
      throw new UnauthorizedException('Access denied');
    }
  }
}
