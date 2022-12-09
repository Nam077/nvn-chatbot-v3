import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './at-guard/at.guard';
import { KeyModule } from './key/key.module';
import { FontModule } from './font/font.module';
import { TagModule } from './tag/tag.module';
import { ImageModule } from './image/image.module';
import { CategoryModule } from './category/category.module';
import { FoodModule } from './food/food.module';
import { BanModule } from './ban/ban.module';
import { CommunicationModule } from './communication/communication.module';
import { MessageModule } from './message/message.module';
import { LinkModule } from './link/link.module';
import { ConfigsModule } from './config/config.module';
import { Configs } from './config/entities/config.entity';
import { Font } from './font/entities/font.entity';
import { FontMessage } from './through/entities/font-message.entity';
import { Link } from './link/entities/link.entity';
import { Message } from './message/entities/message.entity';
import { CommunicationMessage } from './through/entities/communication-message.entity';
import { FontImage } from './through/entities/font-image.entity';
import { Category } from './category/entities/category.entity';
import { FontCategory } from './through/entities/font-category.entity';
import { FontLink } from './through/entities/font-link.entity';
import { FontTag } from './through/entities/font-tag.entity';
import { Tag } from './tag/entities/tag.entity';
import { Ban } from './ban/entities/ban.entity';
import { Communication } from './communication/entities/communication.entity';
import { Food } from './food/entities/food.entity';
import { Image } from './image/entities/image.entity';
import { Key } from './key/entities/key.entity';
import { FontKey } from './through/entities/font-key.entity';
import { CommunicationImage } from './through/entities/communication-image.entity';
import { MessengerModule } from './messenger/messenger.module';
import { ChatModule } from './chat/chat.module';
import { CommunicationKey } from './through/entities/communication-key.entity';
import { ListFontModule } from './list-font/list-font.module';

@Module({
    imports: [
        ConfigsModule,
        UserModule,
        AuthModule,
        KeyModule,
        FontModule,
        TagModule,
        ImageModule,
        CategoryModule,
        FoodModule,
        BanModule,
        CommunicationModule,
        SequelizeModule.forRoot({
            dialect: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '',
            database: 'nvn-chat-bot',
            models: [
                User,
                Configs,
                Link,
                Key,
                Message,
                Image,
                Category,
                Tag,
                Ban,
                Food,
                Font,
                Communication,
                CommunicationMessage,
                CommunicationImage,
                CommunicationKey,
                FontMessage,
                FontCategory,
                FontTag,
                FontImage,
                FontLink,
                FontKey,
            ],
            autoLoadModels: true,
            synchronize: true,
            logging: false,
        }),
        MessageModule,
        LinkModule,
        MessengerModule,
        ChatModule,
        ListFontModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        // {
        //     provide: APP_GUARD,
        //     useClass: AtGuard,
        // },
    ],
})
export class AppModule {}
