import { Module } from '@nestjs/common';
import { CommunicationService } from './communication.service';
import { CommunicationController } from './communication.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Communication } from './entities/communication.entity';
import { CommunicationKey } from '../through/entities/communication-key.entity';
import { CommunicationMessage } from '../through/entities/communication-message.entity';

@Module({
    imports: [SequelizeModule.forFeature([Communication, CommunicationKey, CommunicationMessage])],
    controllers: [CommunicationController],
    providers: [CommunicationService],
})
export class CommunicationModule {}
