import { Module } from '@nestjs/common';
import { LinkService } from './link.service';
import { LinkController } from './link.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Link } from './entities/link.entity';

@Module({
    imports: [SequelizeModule.forFeature([Link])],
    controllers: [LinkController],
    providers: [LinkService],
    exports: [LinkService],
})
export class LinkModule {}
