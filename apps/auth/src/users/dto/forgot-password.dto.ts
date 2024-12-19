import { IsPhoneNumber } from 'class-validator';
import { User } from '../entities/user.entity';
import { IsExist } from '@app/common';

export class ForgotPasswordDto {
  @IsPhoneNumber('BJ')
  @IsExist(User, 'phone', { message: 'Phone does not exist' })
  readonly phone: string;
}
