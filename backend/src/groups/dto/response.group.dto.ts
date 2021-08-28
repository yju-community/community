import { ApiProperty, OmitType } from '@nestjs/swagger';
import { GroupMembers } from 'src/entities/GroupMembers';
import { Groups } from 'src/entities/Groups';

export class ResponseGroupDto extends OmitType(Groups, []) {
  @ApiProperty({
    example: `
    [
        {
            "createdAt": "2021-08-25T00:46:47.415Z",
            "updatedAt": "2021-08-25T00:46:47.415Z",
            "deletedAt": null,
            "groupId": 14,
            "userId": "118072267042802506894",
            "role": 1
        }
    ]`,
    description: '그룹 멤버',
  })
  GroupMembers: Array<GroupMembers>;
}
