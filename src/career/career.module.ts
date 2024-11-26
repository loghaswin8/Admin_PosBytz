import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Career, CareerSchema } from './career.schema';
import { CareerService } from './career.service';
import { CareerController } from './career.controller';
import { LoggerMiddleware } from 'src/middleware/logger.middleware';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { RegisterModule } from 'src/register/register.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Career.name, schema: CareerSchema }]),
    // JwtModule.register({
    //   secret: process.env.JWT_SECRET_KEY, 
    //   signOptions: { expiresIn: '1h' }, 
    // }), 
    RegisterModule,
  ],
  providers: [CareerService],
  controllers: [CareerController], 
  exports: [CareerService],
})
export class CareerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(CareerController)
  }
}
