import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Contact, ContactSchema } from './contact.schema';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { LoggerMiddleware } from 'src/middleware/logger.middleware';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { RegisterModule } from 'src/register/register.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Contact.name, schema: ContactSchema }]),
    RegisterModule,
  ],
  providers: [ContactService],
  controllers: [ContactController], 
  exports: [ContactService],
})
export class ContactModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(ContactController)
  }
}
