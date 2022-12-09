import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { KeyModule } from '../key/key.module';
import { ChatController } from './chat.controller';
import { TagModule } from '../tag/tag.module';
import { BanModule } from '../ban/ban.module';
import { ConfigsModule } from '../config/config.module';
import { CrawlerService } from './crawler/crawler.service';
import { HttpModule } from '@nestjs/axios';
import { ChemistryService } from './chemistry/chemistry.service';

@Module({
    imports: [KeyModule, TagModule, BanModule, ConfigsModule, HttpModule],
    providers: [ChatService, CrawlerService, CrawlerService, ChemistryService],
    controllers: [ChatController],
})
export class ChatModule {}
