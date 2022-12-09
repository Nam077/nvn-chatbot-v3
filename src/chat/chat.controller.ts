import { Controller, Get } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from '../common/decorators/auth.decorator';

@ApiTags('Chat')
@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    @IsPublic()
    @Get('/update')
    async init() {
        // render data
        return this.chatService.getDataCrawlerYoutube('@ytb 3107');
    }
}
