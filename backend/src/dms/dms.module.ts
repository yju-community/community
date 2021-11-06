import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rooms } from 'src/entities/Rooms';
import { Dms } from 'src/entities/Dms';
import { Users } from 'src/entities/Users';
import { EventsGateway } from 'src/events/events.gateway';
import { DmsController } from './dms.controller';
import { DmsService } from './dms.service';

@Module({
  imports: [TypeOrmModule.forFeature([Dms, Users, Rooms])],
  controllers: [DmsController],
  providers: [DmsService, EventsGateway],
})
export class DmsModule {}
