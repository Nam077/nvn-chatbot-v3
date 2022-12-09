import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagService {
    constructor(@InjectModel(Tag) private tagModel: typeof Tag) {}

    async create(createTagDto: CreateTagDto): Promise<Tag> {
        const [tag, created] = await this.tagModel.findOrCreate({
            where: {
                name: createTagDto.name,
            },
        });

        if (created) {
            return tag;
        }
        throw new HttpException('Tag already exists', HttpStatus.CONFLICT);
    }

    async findAll(): Promise<Tag[]> {
        return await this.tagModel.findAll({ include: [{ all: true }] });
    }

    async findOne(id: number): Promise<Tag> {
        return await this.tagModel.findByPk(id);
    }

    async update(id: number, updateTagDto: UpdateTagDto): Promise<Tag> {
        const tag = await this.tagModel.findByPk(id);
        if (!tag) {
            throw new HttpException('Tag not found', HttpStatus.NOT_FOUND);
        }
        if (updateTagDto.name && updateTagDto.name !== tag.name) {
            const findTag = await this.findByName(updateTagDto.name);
            if (findTag) {
                throw new HttpException('Tag already exists', HttpStatus.CONFLICT);
            }
        }
        return await tag.update(updateTagDto);
    }

    async findByName(name: string): Promise<Tag> {
        return await this.tagModel.findOne({ where: { name } });
    }

    async remove(id: number): Promise<void> {
        const tag = await this.tagModel.findByPk(id);
        if (!tag) {
            throw new HttpException('Tag not found', HttpStatus.NOT_FOUND);
        }
        await tag.destroy();
    }

    async findAllByIds(tag_ids: string[]): Promise<Tag[]> {
        return await this.tagModel.findAll({
            where: {
                id: tag_ids,
            },
        });
    }
}
