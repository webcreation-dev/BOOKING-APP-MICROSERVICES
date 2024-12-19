import { IsPassword } from '@app/common';
import { IsPhoneNumber } from 'class-validator';

export class LoginDto {
  @IsPhoneNumber('BR')
  readonly phone: string;

  @IsPassword()
  readonly password: string;
}
