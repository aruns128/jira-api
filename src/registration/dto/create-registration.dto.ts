import { IsNotEmpty, IsEmail, MinLength, Matches } from 'class-validator';
import { Match } from 'src/common/validators/Match.decorator';

export class CreateRegistrationDto {
  @IsNotEmpty()
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message: 'Password too weak',
  })
  password: string;

  @IsNotEmpty()
  @Match('password', { message: 'Passwords must match' })
  confirmPassword: string;

  @IsNotEmpty()
  acceptedTerms: boolean;
}
