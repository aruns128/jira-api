import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import * as bcrypt from 'bcrypt';
import { Registration } from './entities/registration.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RegistrationService {
  constructor(
    @InjectRepository(Registration)
    private readonly registrationRepository: Repository<Registration>,
  ) {}

  async create(createRegistrationDto: CreateRegistrationDto) {
    const userExists = await this.findByUsername(createRegistrationDto.email);

    if (userExists) {
      throw new BadRequestException('User already exists');
    } else {
      const saltOrRounds = 10;
      const hashedPassword = await bcrypt.hash(
        createRegistrationDto.password,
        saltOrRounds,
      );
      const userDetails = {
        ...createRegistrationDto,
        password: hashedPassword,
      };

      const newUser = this.registrationRepository.create(userDetails);

      const createdUser = await this.registrationRepository.save(newUser);

      const response = {
        id: createdUser.id,
        email: createdUser.email,
        fullName: createdUser.fullName,
        username: createdUser.username,
      };

      return response;
    }
  }

  async findByUsername(email: string): Promise<Registration | undefined> {
    return this.registrationRepository.findOne({ where: { email } });
  }
}
