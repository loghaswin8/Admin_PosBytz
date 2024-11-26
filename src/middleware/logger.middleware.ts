import { Injectable, NestMiddleware, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { RegisterService } from '../register/register.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: RegisterService, 
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    console.log(`Request...`);
    console.log(`Method: ${req.method}, URL: ${req.url}`);

  
    const token = req.headers['authorization'];
    console.log(token);

    try {
      const decoded = this.jwtService.verify(token);  
      console.log('Decoded JWT token:', decoded);
  
      const { userId } = decoded; 
      
      console.log('User ID:', userId);
      if (!userId) {
        throw new UnauthorizedException('Invalid token payload');
      }
  
      const user = await this.userService.findById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }
  
      req['user'] = { userId: user._id, userName: user.name };
  
      console.log(`Authenticated User: ${user.name} (ID: ${user._id})`);
      next(); 
    } catch (error) {
      console.error('Authentication failed:', error.message);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
  
}
