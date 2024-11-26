import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, RegisterSchema } from './register.schema';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: RegisterSchema }])],
  providers: [RegisterService],
  controllers: [RegisterController], 
  exports: [RegisterService],
})
export class RegisterModule {}
