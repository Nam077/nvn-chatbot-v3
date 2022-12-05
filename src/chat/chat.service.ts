import { Injectable } from '@nestjs/common';
import { KeyService } from '../key/key.service';
import { Key } from '../key/entities/key.entity';
import { Font } from '../font/entities/font.entity';
import { Communication } from '../communication/entities/communication.entity';
import { TagService } from '../tag/tag.service';
import { Tag } from '../tag/entities/tag.entity';

@Injectable()
export class ChatService {
    private keys: Key[] = [];
    private tags: Tag[] = [];

    constructor(private readonly keyService: KeyService, private readonly tagService: TagService) {
        this.init().then((value: string) => {
            console.log(value);
        });
    }

    async init(): Promise<string> {
        this.keys = await this.getAllKey();
        this.tags = await this.getAllTags();
        return 'ChatService initialized';
    }

    async getAllKey(): Promise<Key[]> {
        return await this.keyService.findAll();
    }

    async getAllTags(): Promise<Tag[]> {
        return await this.tagService.findAll();
    }

    async getTagsByString(string: string): Promise<Tag[]> {
        const listTag: Tag[] = await this.getAllTags();
        return listTag.filter((tag: Tag) => string.toLowerCase().includes(tag.name.toLowerCase()));
    }

    async getFontByTags(string: string): Promise<Font[]> {
        const tags: Tag[] = await this.getTagsByString(string);
        const fonts: Font[] = [];
        tags.forEach((tag: Tag) => {
            fonts.push(...tag.fonts);
        });
        return fonts;
    }

    async getFontAndCommunicationByTagsAndKey(string: string): Promise<DataChat> {
        let fonts: Font[];
        let communications: Communication[];
        this.keys.forEach((key: Key) => {
            if (string.toLowerCase().includes(key.name.toLowerCase()) && key.fonts.length > 0) {
                fonts.push(...key.fonts);
            }
            if (string.toLowerCase().includes(key.name.toLowerCase()) && key.communications.length > 0) {
                communications.push(...key.communications);
            }
        });
        this.tags.forEach((tag: Tag) => {
            if (tag.fonts.length > 0) {
                fonts.push(...tag.fonts);
            }
        });
        return {
            fonts,
            communications,
        };
    }

    public getDataMessage(fonts: Font[]): string[] {
        let data: string[];
        const fontCheckArray: Font[][] = [];
        let message = 'Đây là toàn bộ font của bạn: \n\n';
        for (let i = 0; i < fonts.length; i++) {
            if (i % 10 == 0) {
                fontCheckArray.push([]);
            }
            fontCheckArray[Math.floor(i / 10)].push(fonts[i]);
        }
        for (let i = 0; i < fontCheckArray.length; i++) {
            for (let j = 0; j < fontCheckArray[i].length; j++) {
                message +=
                    'Tên: ' +
                    fontCheckArray[i][j].name +
                    '\nLink tải: ' +
                    fontCheckArray[i][j].links[Math.floor(Math.random() * fontCheckArray[i][j].links.length)] +
                    '\n\n';
            }
            data.push(message);
            message = '';
        }
        return data;
    }
}

export interface DataChat {
    fonts: Font[];
    communications: Communication[];
}
