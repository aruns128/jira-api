import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { UpdateRegistrationDto } from './dto/update-registration.dto';
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

  findAll() {
    return `This action returns all registration`;
  }

  findOne(id: number) {
    return `This action returns a #${id} registration`;
  }

  update(id: number, updateRegistrationDto: UpdateRegistrationDto) {
    return `This action updates a #${id} registration`;
  }

  remove(id: number) {
    return `This action removes a #${id} registration`;
  }

  async findByUsername(email: string): Promise<Registration | undefined> {
    return this.registrationRepository.findOne({ where: { email } });
  }
}
