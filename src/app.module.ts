import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistrationModule } from './registration/registration.module';
import databaseConfig from './database.module';

@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig), RegistrationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
