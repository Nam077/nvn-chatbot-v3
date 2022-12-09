import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateListFontDto } from './dto/create-list-font.dto';
import { UpdateListFontDto } from './dto/update-list-font.dto';
import { ListFont } from './entities/list-font.entity';
import { InjectModel } from '@nestjs/sequelize';
import { FontService } from '../font/font.service';

@Injectable()
export class ListFontService {
    constructor(
        @InjectModel(ListFont) private listFontModel: typeof ListFont,
        private readonly fontService: FontService,
    ) {}

    async create(createListFontDto: CreateListFontDto): Promise<ListFont> {
        const [listFont, created] = await this.listFontModel.findOrCreate({
            where: {
                value: createListFontDto.value,
            },
            defaults: {
                value: createListFontDto.value,
            },
        });
        if (created) {
            return listFont;
        }
        throw new HttpException('Font already exists', HttpStatus.CONFLICT);
    }

    async findAll(): Promise<ListFont[]> {
        return this.listFontModel.findAll();
    }

    async findOne(id: number): Promise<ListFont> {
        return this.listFontModel.findByPk(id);
    }

    async update(id: number, updateListFontDto: UpdateListFontDto): Promise<ListFont> {
        const listFont = await this.listFontModel.findByPk(id);
        if (listFont) {
            return listFont.update(updateListFontDto);
        }
        throw new HttpException('List Font not found', HttpStatus.NOT_FOUND);
    }

    async remove(id: number): Promise<string> {
        const listFont = await this.listFontModel.findByPk(id);
        if (listFont) {
            await listFont.destroy();
            return 'List Font deleted';
        }
        throw new HttpException('List Font not found', HttpStatus.NOT_FOUND);
    }

    async getTableName(): Promise<string> {
        return this.listFontModel.getTableName().toString();
    }

    async setAutoIncrement(): Promise<string> {
        await this.listFontModel.sequelize.query(
            `ALTER TABLE ${this.listFontModel.getTableName()} AUTO_INCREMENT = 1;`,
        );
        return 'List Font auto increment set';
    }

    async deleteAll(): Promise<string> {
        await this.listFontModel.destroy({ truncate: true });
        await this.setAutoIncrement();
        return 'List Font deleted';
    }

    async deleteMultiple(ids: number[]): Promise<string> {
        await this.listFontModel.destroy({ where: { id: ids } });
        return 'List Font deleted';
    }
}
