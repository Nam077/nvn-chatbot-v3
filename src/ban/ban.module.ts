import { Module } from '@nestjs/common';
import { BanService } from './ban.service';
import { BanController } from './ban.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Ban } from './entities/ban.entity';

@Module({
    imports: [SequelizeModule.forFeature([Ban])],
    controllers: [BanController],
    providers: [BanService],
    exports: [BanService],
})
export class BanModule {}
