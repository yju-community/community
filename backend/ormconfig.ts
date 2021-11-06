import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import dotenv from 'dotenv';
import { Blacklists } from './src/entities/Blacklists';
import { Rooms } from './src/entities/Rooms';
import { RoomChats } from './src/entities/RoomChats';
import { RoomMembers } from './src/entities/RoomMembers';
import { Comments } from './src/entities/Comments';
import { Friends } from './src/entities/Friends';
import { GroupCategories } from './src/entities/GroupCategories';
import { Groups } from './src/entities/Groups';
import { GroupMembers } from './src/entities/GroupMembers';
import { Images } from './src/entities/Images';
import { Majors } from './src/entities/Majors';
import { PostCategories } from './src/entities/PostCategories';
import { Posts } from './src/entities/Posts';
import { ReportCategories } from './src/entities/ReportCategories';
import { Users } from './src/entities/Users';
import { CommentReports } from './src/entities/CommentReports';
import { PostReports } from './src/entities/PostReports';
import { UserReports } from './src/entities/UserReport';
import { PostLike } from './src/entities/PostLike';
import { CommentLike } from './src/entities/CommentLike';
import { Dms } from './src/entities/Dms';
import { Mentions } from './src/entities/Mentions';

dotenv.config();

const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database:
    process.env.NODE_ENV === 'test' ? 'testdb' : process.env.DB_DATABASE,
  entities: [
    Blacklists,
    Rooms,
    RoomChats,
    RoomMembers,
    Comments,
    Friends,
    GroupCategories,
    Groups,
    GroupMembers,
    Images,
    Majors,
    PostCategories,
    Posts,
    PostReports,
    CommentReports,
    ReportCategories,
    Users,
    UserReports,
    PostLike,
    CommentLike,
    Dms,
    Mentions,
  ],
  migrations: [__dirname + '/src/migrations/*.ts'],
  cli: { migrationsDir: 'src/migrations' },
  autoLoadEntities: true,
  charset: 'utf8mb4',
  synchronize: true,
  logging: true,
  keepConnectionAlive: true,
  namingStrategy: new SnakeNamingStrategy(),
};

export = config;
