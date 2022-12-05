import { Module } from '@nestjs/common';
import { KeyService } from './key.service';
import { KeyController } from './key.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Key } from './entities/key.entity';
import { FontKey } from '../through/entities/font-key.entity';
import { CommunicationKey } from '../through/entities/communication-key.entity';

@Module({
    imports: [SequelizeModule.forFeature([Key, FontKey, CommunicationKey])],
    controllers: [KeyController],
    providers: [KeyService],
    exports: [KeyService],
})
export class KeyModule {}
