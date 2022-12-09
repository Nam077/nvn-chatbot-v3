import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateKeyDto } from './dto/create-key.dto';
import { UpdateKeyDto } from './dto/update-key.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Key } from './entities/key.entity';
import { Communication } from '../communication/entities/communication.entity';
import { Font } from '../font/entities/font.entity';
import { update } from 'cheerio/lib/parse';
import { remove } from 'cheerio/lib/api/manipulation';
import { async } from 'rxjs';
import { FontKey } from '../through/entities/font-key.entity';
import { create } from 'domain';
import { CommunicationKey } from '../through/entities/communication-key.entity';
import { and } from 'sequelize';

@Injectable()
export class KeyService {
    constructor(
        @InjectModel(Key) private keyModel: typeof Key,
        @InjectModel(FontKey) private fontKeyModel: typeof FontKey,
        @InjectModel(CommunicationKey) private communicationKeyModel: typeof CommunicationKey,
    ) {}

    async create(createKeyDto: CreateKeyDto): Promise<Key> {
        const [key, created] = await this.keyModel.findOrCreate({
            where: {
                name: createKeyDto.name,
            },
            defaults: createKeyDto,
        });

        if (created) {
            return key;
        }
        throw new HttpException('Key already exists', HttpStatus.CONFLICT);
    }

    async findAll(): Promise<Key[]> {
        return await this.keyModel.findAll({
            include: [
                {
                    model: Font,
                    through: { attributes: [] },
                },
                {
                    model: Communication,
                    through: { attributes: [] },
                },
            ],
        });
    }

    async findOne(id: number) {
        return await this.keyModel.findByPk(id);
    }

    async update(id: number, updateKeyDto: UpdateKeyDto) {
        const key = await this.keyModel.findByPk(id);
        if (!key) {
            throw new HttpException('Key not found', HttpStatus.NOT_FOUND);
        }
        if (updateKeyDto.name && updateKeyDto.name !== key.name) {
            const findKey = await this.findByName(updateKeyDto.name);
            if (findKey) {
                throw new HttpException('Key already exists', HttpStatus.CONFLICT);
            }
        }
        return await key.update(updateKeyDto);
    }

    async findByName(name: string): Promise<Key> {
        return await this.keyModel.findOne({ where: { name } });
    }

    async remove(id: number): Promise<void> {
        const key = await this.keyModel.findByPk(id);
        if (!key) {
            throw new HttpException('Key not found', HttpStatus.NOT_FOUND);
        }
        await key.destroy();
    }

    async validateKeyIds(keyIds: number[]): Promise<Key[]> {
        return await this.keyModel.findAll({
            where: {
                id: keyIds,
            },
        });
    }

    async findAllByIds(key_ids: string[]): Promise<Key[]> {
        return await this.checkMultipleKey(key_ids);
    }

    async checkMultipleKey(key_ids: string[]): Promise<Key[]> {
        key_ids = key_ids.filter((id) => id);
        const keys = await this.keyModel.findAll({
            where: {
                id: key_ids,
            },
        });
        const fontKeys = await this.fontKeyModel.findAll({
            where: {
                keyId: key_ids,
            },
        });
        const communicationKeys = await this.communicationKeyModel.findAll({
            where: {
                keyId: key_ids,
            },
        });

        //Nếu có key nào đã được sử dụng ở bảng font_key hoặc communication_key thì xóa khỏi mảng keys
        keys.forEach((key) => {
            if (fontKeys.find((fontKey) => fontKey.keyId === key.id)) {
                keys.splice(keys.indexOf(key), 1);
            }
            if (communicationKeys.find((communicationKey) => communicationKey.keyId === key.id)) {
                keys.splice(keys.indexOf(key), 1);
            }
        });
        console.log(keys);

        return keys;
    }
}
