import { Module, MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

import { HomeModule } from './home/home.module'; 
import { AboutModule } from './about/about.module'; 
import { ContactModule } from './contact/contact.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupportModule } from './support/support.module';
import { CareerModule } from './career/career.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { LoginController } from './login/login.controller';
import { RegisterController } from './register/register.controller';
import { PermissionModule } from './permission/permission.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/test'),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,  
      signOptions: { expiresIn: '1h' }, 
    }),
    LoginModule,
    RegisterModule,
    HomeModule,
    AboutModule,
    ContactModule, 
    SupportModule,
    CareerModule,
    PermissionModule,
    RolesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [JwtModule]
})
export class AppModule{ 
  // configure(consumer: MiddlewareConsumer) {
  // Apply the LoggerMiddleware to all routes except LoginController and RegisterController
  //   consumer
  //     .apply(LoggerMiddleware)
  //     .exclude(
  //       // { path: 'login', method: RequestMethod.ALL }, // Exclude all routes under login
  //       { path: 'register', method: RequestMethod.ALL },
  //       {path: 'home' , method: RequestMethod.ALL} // Exclude all routes under register
  //     )
  //     .forRoutes('*');  // Apply to all other routes
  // }
}
