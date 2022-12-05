import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { KeyModule } from '../key/key.module';
import { ChatController } from './chat.controller';
import { TagModule } from '../tag/tag.module';

@Module({
    imports: [KeyModule, TagModule],
    providers: [ChatService],
    controllers: [ChatController],
})
export class ChatModule {}
