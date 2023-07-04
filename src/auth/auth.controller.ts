import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() createRegistrationDto: CreateRegistrationDto) {
    return this.authService.register(createRegistrationDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
