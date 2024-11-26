import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';
import { Home, HomeSchema } from './home.schema';
import { LoggerMiddleware } from 'src/middleware/logger.middleware';
import { LoginModule } from 'src/login/login.module'; // Import the LoginModule
import { JwtModule, JwtService } from '@nestjs/jwt';
import { RegisterModule } from 'src/register/register.module';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Home', schema: HomeSchema },
    ]),
    // LoginModule, // Add LoginModule here
    // JwtModule.register({
    //   secret: process.env.JWT_SECRET_KEY, // Secret from .env
    //   signOptions: { expiresIn: '1h' },   // Token expiry
    // }), 
    RegisterModule,
  ],
  controllers: [HomeController],
  providers: [HomeService],
  
})
export class HomeModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(HomeController);
  }
}
