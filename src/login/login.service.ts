import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Login, LoginDocument } from './login.schema';

@Injectable()
export class LoginService {
  constructor(
    @InjectModel('Login') private readonly loginModel: Model<LoginDocument>,
  ) {}

  async findByEmail(email: string): Promise<LoginDocument | null> {
    return this.loginModel.findOne({ email }).exec();
  }

  async createLoginAttempt(login: Login): Promise<Login> {
    const newLogin = new this.loginModel(login);
    return newLogin.save();
  }
}
