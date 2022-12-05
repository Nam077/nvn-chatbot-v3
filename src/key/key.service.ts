import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateKeyDto } from './dto/create-key.dto';
import { UpdateKeyDto } from './dto/update-key.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Key } from './entities/key.entity';
import { Communication } from '../communication/entities/communication.entity';
import { Font } from '../font/entities/font.entity';

@Injectable()
export class KeyService {
    constructor(@InjectModel(Key) private keyModel: typeof Key) {}

    async create(createKeyDto: CreateKeyDto): Promise<Key> {
        const [key, created] = await this.keyModel.findOrCreate({
            where: {
                name: createKeyDto.name,
            },
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
}
