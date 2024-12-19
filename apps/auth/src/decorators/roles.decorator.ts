import { NonEmptyArray } from '@app/common';
import { SetMetadata } from '@nestjs/common';
import { Role } from '../roles/enums/role.enum';

export const ROLES_KEY = 'roles';

export const Roles = (...roles: NonEmptyArray<Role>) =>
  SetMetadata(ROLES_KEY, roles);
