import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ListFont } from '../list-font/entities/list-font.entity';
import { Link } from './entities/link.entity';

@Injectable()
export class LinkService {
    constructor(@InjectModel(Link) private linkModel: typeof Link) {}

    async create(createLinkDto: CreateLinkDto): Promise<Link> {
        const [link, created] = await this.linkModel.findOrCreate({
            where: {
                name: createLinkDto.name,
            },
            defaults: createLinkDto,
        });
        return link;
    }

    async findAll(): Promise<Link[]> {
        return this.linkModel.findAll();
    }

    async findOne(id: number): Promise<Link> {
        return this.linkModel.findOne({ where: { id } });
    }

    async update(id: number, updateLinkDto: UpdateLinkDto): Promise<Link> {
        const link = await this.findOne(id);
        if (link) {
            return link.update(updateLinkDto);
        }
        throw new HttpException('Link not found', HttpStatus.NOT_FOUND);
    }

    async remove(id: number): Promise<Link> {
        const link = await this.findOne(id);
        if (link) {
            await link.destroy();
            return link;
        }
        throw new HttpException('Link not found', HttpStatus.NOT_FOUND);
    }

    async findAllByIds(link_ids: string[]): Promise<Link[]> {
        return await this.linkModel.findAll({ where: { id: link_ids } });
    }
}
