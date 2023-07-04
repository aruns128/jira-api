import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import * as bcrypt from 'bcrypt';
import { Registration } from './entities/registration.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Registration)
    private readonly registrationRepository: Repository<Registration>,
  ) {}

  async register(createRegistrationDto: CreateRegistrationDto) {
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

  async login(loginDto: LoginDto) {
    const userExists = await this.findByUsername(loginDto.email);

    if (userExists) {
      const isPasswordMatch = bcrypt.compareSync(
        loginDto.password,
        userExists.password,
      );
      if (isPasswordMatch) {
        const { password, ...userDetails } = userExists;

        return userDetails;
      } else {
        throw new BadRequestException('Invalid credentials');
      }
      console.log(isPasswordMatch);
    } else {
      throw new BadRequestException('Invalid credentials');
    }
  }

  async findByUsername(email: string): Promise<Registration | undefined> {
    return this.registrationRepository.findOne({ where: { email } });
  }
}
