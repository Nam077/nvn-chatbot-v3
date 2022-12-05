import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MessengerService } from './messenger.service';

@Controller('messenger')
export class MessengerController {
    constructor(private readonly messengerService: MessengerService) {}

    @Post('/webhook')
    postWebhook(@Body() body: any) {
        console.log(body);
        return body;
    }

    @Get('/webhook')
    getWebhook(@Body() body: any) {
        console.log(body);
        return body;
    }
}
