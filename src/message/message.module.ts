import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { Message } from './entities/message.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
    imports: [SequelizeModule.forFeature([Message])],
    controllers: [MessageController],
    providers: [MessageService],
    exports: [MessageService],
})
export class MessageModule {}
