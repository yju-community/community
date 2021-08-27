import { PickType } from '@nestjs/swagger';
import { GroupMembers } from 'src/entities/GroupMembers';

export class MemberDto extends PickType(GroupMembers, []) {}
