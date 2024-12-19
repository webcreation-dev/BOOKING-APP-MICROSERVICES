import { IsPassword, Match } from '@app/common';
import { IsString } from 'class-validator';

export class PasswordDto {
  /**
   * Requires:
   * 1. 8 to 20 characters
   * 2. At least one
   * - Lowercase letter
   * - Uppercase letter
   * - Number
   * - Special character
   */
  @IsPassword()
  readonly password: string;

  @IsString()
  @Match('password', { message: 'Passwords do not match' })
  readonly password_confirmation: string;
}
