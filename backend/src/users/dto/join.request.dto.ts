import { PickType } from '@nestjs/swagger';
import { Users } from 'src/entities/Users';

/*
class : interface와 비슷한 역할을 해주면서도 
자바스크립트로 바뀌어도 남아있음 
validation 가능
*/
export class JoinRequestDto extends PickType(Users, ['id', 'email'] as const) {}
