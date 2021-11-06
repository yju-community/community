import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import DateColumn from './DateColumn';
import { Users } from './Users';

@Entity('blacklists', { schema: 'yju' })
export class Blacklists extends DateColumn {
  @Column({ primary: true, type: 'varchar', length: 50 })
  userId: string;

  @Column({ primary: true, type: 'varchar', length: 50 })
  blackUserId: string;

  @ManyToOne(() => Users, (users) => users.BlockRequireUsers, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  User: Users;

  @ManyToOne(() => Users, (users) => users.BlockedUsers, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'blackUser_id', referencedColumnName: 'id' }])
  BlackUser: Users;
}
