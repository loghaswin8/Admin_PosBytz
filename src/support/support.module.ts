import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Support, SupportSchema } from './support.schema';
import { SupportService } from './support.service';
import { SupportController } from './support.controller';
import { LoggerMiddleware } from 'src/middleware/logger.middleware';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { RegisterModule } from 'src/register/register.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Support.name, schema: SupportSchema }]),
    // JwtModule.register({
    //   secret: process.env.JWT_SECRET_KEY, 
    //   signOptions: { expiresIn: '1h' }, 
    // }), 
    RegisterModule,
  ],
  providers: [SupportService],
  controllers: [SupportController], 
  exports: [SupportService],
})
export class SupportModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(SupportController)
  }
}
