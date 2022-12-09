import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ListFontService } from './list-font.service';
import { CreateListFontDto } from './dto/create-list-font.dto';
import { UpdateListFontDto } from './dto/update-list-font.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('list-font')
@ApiBearerAuth()
@ApiTags('ListFont')
export class ListFontController {
    constructor(private readonly listFontService: ListFontService) {}

    @Post()
    create(@Body() createListFontDto: CreateListFontDto) {
        return this.listFontService.create(createListFontDto);
    }

    @Get()
    findAll() {
        return this.listFontService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.listFontService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateListFontDto: UpdateListFontDto) {
        return this.listFontService.update(+id, updateListFontDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.listFontService.remove(+id);
    }
}
