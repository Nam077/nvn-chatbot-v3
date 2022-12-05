import { Module } from '@nestjs/common';
import { MessengerController } from './messenger.controller';
import { MessengerService } from './messenger.service';
import { ConfigsModule } from '../config/config.module';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [ConfigsModule, HttpModule],
    controllers: [MessengerController],
    providers: [MessengerService],
})
export class MessengerModule {}
