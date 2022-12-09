import { Injectable } from '@nestjs/common';
import { CreateFontDto } from './dto/create-font.dto';
import { UpdateFontDto } from './dto/update-font.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Font } from './entities/font.entity';
import { FontKey } from '../through/entities/font-key.entity';
import { FontCategory } from '../through/entities/font-category.entity';
import { FontTag } from '../through/entities/font-tag.entity';
import { FontMessage } from '../through/entities/font-message.entity';
import { FontImage } from '../through/entities/font-image.entity';
import { TagService } from '../tag/tag.service';
import { KeyService } from '../key/key.service';
import { CategoryService } from '../category/category.service';
import { ImageService } from '../image/image.service';
import { MessageService } from '../message/message.service';
import { FontLink } from '../through/entities/font-link.entity';
import { LinkService } from '../link/link.service';

@Injectable()
export class FontService {
    constructor(
        @InjectModel(Font) private fontModel: typeof Font,
        @InjectModel(FontKey) private fontKeyModel: typeof FontKey,
        @InjectModel(FontCategory) private fontCategoryModel: typeof FontCategory,
        @InjectModel(FontMessage) private fontMessageModel: typeof FontMessage,
        @InjectModel(FontTag) private fontTagModel: typeof FontTag,
        @InjectModel(FontImage) private fontImageModel: typeof FontImage,
        //FontLink
        @InjectModel(FontLink) private fontLinkModel: typeof FontLink,
        private readonly keyService: KeyService,
        private readonly categoryService: CategoryService,
        private readonly tagService: TagService,
        private readonly messageService: MessageService,
        private readonly imageService: ImageService,
        private readonly linkService: LinkService,
    ) {}

    async create(createFontDto: CreateFontDto): Promise<Font> {
        let [font, created] = await this.fontModel.findOrCreate({
            where: {
                name: createFontDto.name,
            },
            defaults: {
                name: createFontDto.name,
                description: createFontDto.description,
                post_url: createFontDto.post_url,
            },
            include: { all: true },
        });

        if (created) {
            if (createFontDto.key_ids) {
                const keys = await this.keyService.findAllByIds(createFontDto.key_ids);
                await font.$set('keys', keys);
            }
            if (createFontDto.category_ids) {
                const categories = await this.categoryService.findAllByIds(createFontDto.category_ids);
                await font.$set('categories', categories);
            }
            if (createFontDto.tag_ids) {
                const tags = await this.tagService.findAllByIds(createFontDto.tag_ids);
                await font.$set('tags', tags);
            }
            if (createFontDto.message_ids) {
                const messages = await this.messageService.findAllByIds(createFontDto.message_ids);
                await font.$set('messages', messages);
            }
            if (createFontDto.image_ids) {
                const images = await this.imageService.findAllByIds(createFontDto.image_ids);
                await font.$set('images', images);
            }
            if (createFontDto.link_ids) {
                const links = await this.linkService.findAllByIds(createFontDto.link_ids);
                await font.$set('links', links);
            }
            return this.findOne(font.id);
        }
        return font;
    }

    async findAll(): Promise<Font[]> {
        return this.fontModel.findAll({ include: { all: true, through: { attributes: [] } } });
    }

    async findOne(id: number) {
        return this.fontModel.findByPk(id, { include: { all: true } });
    }

    async update(id: number, updateFontDto: UpdateFontDto) {}

    async remove(id: number) {
        const font = await this.fontModel.findByPk(id, { include: { all: true } });
        await font.$set('keys', []);
        await font.$set('categories', []);
        await font.$set('tags', []);
        await font.$set('messages', []);
        await font.$set('images', []);
        await font.$set('links', []);
        await font.destroy();
    }
}
