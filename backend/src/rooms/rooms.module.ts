import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomChats } from 'src/entities/RoomChats';
import { RoomMembers } from 'src/entities/RoomMembers';
import { Rooms } from 'src/entities/Rooms';
import { Users } from 'src/entities/Users';
import { EventsGateway } from 'src/events/events.gateway';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';

@Module({
  imports: [TypeOrmModule.forFeature([Rooms, RoomChats, Users, RoomMembers])],
  controllers: [RoomsController],
  providers: [RoomsService, EventsGateway],
})
export class RoomsModule {}
