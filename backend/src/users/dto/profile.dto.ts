import { PickType } from '@nestjs/swagger';
import { Users } from 'src/entities/Users';

export class ProfileDto extends PickType(Users, [
  'nickname',
  'profileImage',
  'gender',
  'major',
] as const) {}
