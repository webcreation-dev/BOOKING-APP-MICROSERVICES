import { IsPhoneNumber } from 'class-validator';
import { User } from '../entities/user.entity';
import { IsUnique } from '@app/common';
// import { OtpDto } from 'otp/dto/otp.dto';

export class SaveUserDto {
  // export class SaveUserDto extends OtpDto {
  @IsPhoneNumber('BJ')
  @IsUnique(User, 'phone', { message: 'Phone must be unique' })
  readonly phone: string;
}
