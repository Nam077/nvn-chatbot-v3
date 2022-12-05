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

@Module({
    imports: [SequelizeModule.forFeature([Font, FontKey, FontCategory, FontMessage, FontTag, FontImage])],
    controllers: [FontController],
    providers: [FontService],
})
export class FontModule {}
