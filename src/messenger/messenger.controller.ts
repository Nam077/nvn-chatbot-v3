import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { MessengerService } from './messenger.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsPublic } from '../common/decorators/auth.decorator';

@ApiTags('Messenger')
@Controller('messenger')
@ApiBearerAuth()
export class MessengerController {
    constructor(private readonly messengerService: MessengerService) {}

    @IsPublic()
    @Get('/webhook')
    @ApiOperation({ summary: 'Setup webhook' })
    getWebHook(
        @Query('hub.mode') mode: string,
        @Query('hub.challenge') challenge: string,
        @Query('hub.verify_token') verifyToken: string,
    ) {
        console.log(mode, challenge, verifyToken);
        return this.messengerService.getWebHook(mode, challenge, verifyToken);
    }

    @IsPublic()
    @Post('/webhook')
    @ApiOperation({ summary: 'Setup webhook' })
    postWebHook(@Body() body) {
        console.log(body);
        return this.messengerService.postWebHook(body);
    }

    @IsPublic()
    @Get('/test')
    @ApiOperation({ summary: 'Test' })
    test(@Query('sender_psid') senderPsid: string) {
        return this.messengerService.test(senderPsid);
    }
    @IsPublic()
    @Get('/get-info')
    @ApiOperation({ summary: 'Get info' })
    getInfo(@Query('id') id: string) {
        return this.messengerService.getInfo(id);
    }

    @IsPublic()
    @Get('/set-up')
    @ApiOperation({ summary: 'Set up' })
    setUp() {
        return this.messengerService.setUp();
    }
}
