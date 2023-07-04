import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Registration } from './entities/registration.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Registration])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
