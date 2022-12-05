import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tag } from './entities/tag.entity';
import { FontTag } from '../through/entities/font-tag.entity';

@Module({
    imports: [SequelizeModule.forFeature([Tag, FontTag])],
    controllers: [TagController],
    providers: [TagService],
    exports: [TagService],
})
export class TagModule {}
