import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { About, AboutSchema } from './about.schema';
import { AboutService } from './about.service';
import { AboutController } from './about.controller';
import { LoggerMiddleware } from 'src/middleware/logger.middleware';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { RegisterModule } from 'src/register/register.module';

@Module({
  imports: [
    MongooseModule.forFeature([
    { name: About.name, schema: AboutSchema }
  ]),
  RegisterModule,
],
  providers: [AboutService],
  controllers: [AboutController],
  exports: [AboutService],
})
export class AboutModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(AboutController)
  }
}
