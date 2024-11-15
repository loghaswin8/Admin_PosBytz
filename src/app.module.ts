import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HomeModule } from './home/home.module'; 
import { AboutModule } from './about/about.module'; 
import { ContactModule } from './contact/contact.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupportModule } from './support/support.module';
import { CareerModule } from './career/career.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/test'), 
    HomeModule, 
    AboutModule, 
    ContactModule, 
    SupportModule,
    CareerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
