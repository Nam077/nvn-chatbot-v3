import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConfigsService } from './config.service';
import { CreateConfigDto } from './dto/create-config.dto';
import { UpdateConfigDto } from './dto/update-config.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('config')
@ApiBearerAuth()
@ApiTags('Config')
export class ConfigController {
    constructor(private readonly configsService: ConfigsService) {}

    @Post()
    create(@Body() createConfigDto: CreateConfigDto) {
        return this.configsService.create(createConfigDto);
    }

    @Get()
    findAll() {
        return this.configsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.configsService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateConfigDto: UpdateConfigDto) {
        return this.configsService.update(+id, updateConfigDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.configsService.remove(+id);
    }
}
