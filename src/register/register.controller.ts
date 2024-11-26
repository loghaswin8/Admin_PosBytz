import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { RegisterService } from './register.service';
import { User } from './register.schema';

@Controller('user')
export class RegisterController {
    constructor(private readonly registerService: RegisterService) { }

    @Get('check-email')
    async checkEmailExists(@Query('email') email: string) {
        console.log('Checking email:', email);
        return this.registerService.checkEmailExists(email);  
    }
    
    @Get('all')
    async getAllUsers() {
        try {
            return await this.registerService.getAllUsers();
        } catch (error) {
            console.error('Error in GET /register/all-users:', error);
            return { error: 'Failed to fetch all users' };
        }
    }


    @Post()
    async registerUser(@Body() userData: Partial<User>) {
        return this.registerService.create(userData);
    }
}
