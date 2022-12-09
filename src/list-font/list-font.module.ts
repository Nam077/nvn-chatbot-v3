import { Module } from '@nestjs/common';
import { ListFontService } from './list-font.service';
import { ListFontController } from './list-font.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ListFont } from './entities/list-font.entity';
import { FontModule } from '../font/font.module';

@Module({
    imports: [SequelizeModule.forFeature([ListFont]), FontModule],
    controllers: [ListFontController],
    providers: [ListFontService],
    exports: [ListFontService],
})
export class ListFontModule {}
