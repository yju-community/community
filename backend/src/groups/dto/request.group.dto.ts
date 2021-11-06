import { PickType } from '@nestjs/swagger';
import { Groups } from 'src/entities/Groups';

export class RequestGroupDto extends PickType(Groups, ['name', 'categoryId']) {}
