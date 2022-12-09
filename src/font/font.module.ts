import { Module } from '@nestjs/common';
import { FontService } from './font.service';
import { FontController } from './font.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Font } from './entities/font.entity';
import { FontKey } from '../through/entities/font-key.entity';
import { FontCategory } from '../through/entities/font-category.entity';
import { FontMessage } from '../through/entities/font-message.entity';
import { FontTag } from '../through/entities/font-tag.entity';
import { FontImage } from '../through/entities/font-image.entity';
import { KeyModule } from '../key/key.module';
import { CategoryModule } from '../category/category.module';
import { TagModule } from '../tag/tag.module';
import { ImageModule } from '../image/image.module';
import { MessageModule } from '../message/message.module';
import { LinkModule } from '../link/link.module';
import { FontLink } from '../through/entities/font-link.entity';

@Module({
    imports: [
        SequelizeModule.forFeature([Font, FontKey, FontCategory, FontMessage, FontTag, FontImage, FontLink]),
        KeyModule,
        CategoryModule,
        TagModule,
        ImageModule,
        MessageModule,
        LinkModule,
    ],
    controllers: [FontController],
    providers: [FontService],
    exports: [FontService],
})
export class FontModule {}
