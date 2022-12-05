import { Module } from '@nestjs/common';
import { ConfigsService } from './config.service';
import { ConfigController } from './config.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Configs } from './entities/config.entity';

@Module({
    imports: [SequelizeModule.forFeature([Configs])],
    controllers: [ConfigController],
    providers: [ConfigsService],
    exports: [ConfigsService],
})
export class ConfigsModule {}
