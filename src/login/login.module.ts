import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { LoginSchema } from './login.schema';
import { RegisterModule } from 'src/register/register.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: 'Login', schema: LoginSchema }]),
    RegisterModule, 
  ],
  providers: [LoginService, JwtService, ConfigService ],
  controllers: [LoginController],
})
export class LoginModule{}
