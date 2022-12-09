import { Injectable } from '@nestjs/common';
import { KeyService } from '../key/key.service';
import { Key } from '../key/entities/key.entity';
import { Font } from '../font/entities/font.entity';
import { Communication } from '../communication/entities/communication.entity';
import { TagService } from '../tag/tag.service';
import { Tag } from '../tag/entities/tag.entity';
import { Ban } from '../ban/entities/ban.entity';
import { BanService } from '../ban/ban.service';
import { ConfigsService } from '../config/config.service';
import {
    CrawDataGoogle,
    CrawDataLucky,
    CrawDataYoutube,
    CrawlerCovid,
    CrawlerService,
} from './crawler/crawler.service';
import { ChemistryResult, ChemistryService } from './chemistry/chemistry.service';

@Injectable()
export class ChatService {
    private keys: Key[] = [];
    private tags: Tag[] = [];

    constructor(
        private readonly keyService: KeyService,
        private readonly tagService: TagService,
        private readonly banService: BanService,
        private readonly configsService: ConfigsService,
        private readonly crawlerService: CrawlerService,
        private readonly chemistryService: ChemistryService,
    ) {
        this.init().then((value: string) => {
            console.log(value);
        });
    }

    public async getDataCrawlerGoogle(message: string): Promise<CrawDataGoogle[]> {
        return this.crawlerService.getCrawler(message);
    }

    public async getDataCrawlerCovid(message: string): Promise<CrawlerCovid> {
        return this.crawlerService.crawlerCovid19(message);
    }

    public async getDataCrawlerYoutube(message: string): Promise<CrawDataYoutube[]> {
        return await this.crawlerService.getYoutube(message);
    }

    public async getDataXoSo(): Promise<string> {
        return this.crawlerService.crawlerXSMB();
    }

    public getLuckNumber(message: string): CrawDataLucky {
        return this.crawlerService.getLuckyNumber(message);
    }

    public getChemistryEquationBalancer(message: string): string {
        return this.chemistryService.getChemistryEquationBalancer(message).text;
    }

    public getAllBan(): Promise<Ban[]> {
        return this.banService.findAll();
    }

    public splitBans(bans: Ban[]): Ban[][] {
        const banCheckArray: Ban[][] = [];
        for (let i = 0; i < bans.length; i += 10) {
            banCheckArray.push(bans.slice(i, i + 10));
        }
        return banCheckArray;
    }

    public async getBanToMessage(): Promise<string[]> {
        const bans: Ban[] = await this.getAllBan();
        if (bans.length == 0) {
            return ['Chưa có tài khoản nào bị cấm'];
        }
        const splitBans: Ban[][] = this.splitBans(bans);
        const stringBans: string[] = [];
        let stringBan = 'Danh sách tài khoản bị cấm: \n\n';
        splitBans.forEach((ban: Ban[]) => {
            ban.forEach((ban: Ban) => {
                stringBan += `Tên: ${ban.name} \n Psid: ${ban.psid} \n\n`;
            });
            stringBans.push(stringBan);
            stringBan = '';
        });

        return stringBans;
    }

    async init(): Promise<string> {
        this.keys = await this.getAllKey();
        this.tags = await this.getAllTags();
        return 'ChatService initialized';
    }

    async getBotActive(): Promise<boolean> {
        return this.configsService.getConfigBoolean('BOT_CAN_MESSAGE');
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

    public async getDataMessage(message: string, senderPsid: string): Promise<Font | string[] | Communication> {
        const dataChat: DataChat = await this.getFontAndCommunicationByTagsAndKey(message);
        const fonts: Font[] = dataChat.fonts;
        const communications: Communication[] = dataChat.communications;
        if (fonts.length > 0) {
            return this.getFontsToMessage(fonts, senderPsid);
        }
        if (communications.length > 0) {
            return communications[Math.floor(Math.random() * communications.length)];
        }
    }

    private async getFontsToMessage(fonts: Font[], senderPsid: string): Promise<string[] | Font> {
        const isCanDownloadMultipleFont: boolean = await this.configsService.getConfigBoolean('DOWNLOAD_MULTIPLE_FONT');
        const psidAdmin: string = await this.configsService.getConfigString('PSID_ADMIN');

        if (isCanDownloadMultipleFont || psidAdmin == senderPsid) {
            return this.getMultipleFontsToMessage(fonts);
        } else return fonts[0];
    }

    public async addBan(senderPsid: string, reason: string): Promise<string> {
        await this.banService.create({
            name: 'Loading...',
            psid: senderPsid,
            reason: reason,
        });
        return 'Đã cấm thành công';
    }

    public async updateNameBan(senderPsid: string, name: string): Promise<string> {
        const ban: Ban = await this.banService.findByPsid(senderPsid);
        ban.name = name;
        await this.banService.updateName(senderPsid, name);
        return 'Đã cập nhật tên thành công';
    }

    public async checkBotAndBan(senderPsid: string): Promise<BanCheck> {
        const ban: Ban = await this.banService.findByPsid(senderPsid);
        if (ban) {
            const stringBan: string[] = [];
            stringBan.push(`Tài khoản của bạn đã bị cấm vì lý do: ${ban.reason}`);
            stringBan.push(`Nếu bạn muốn được hỗ trợ, vui lòng liên hệ với admin qua địa chỉ: m.me/nam077.me`);
            stringBan.push(senderPsid);
            return {
                checkBan: true,
                data: stringBan,
            };
        } else {
            //get giờ viêt nam hiện tại
            const isCanBan: boolean = await this.configsService.getConfigBoolean('CAN_BAN');
            if (isCanBan) {
                const date = new Date();
                date.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
                const hour = date.getHours();
                if (hour >= 0 && hour <= 5) {
                    const stringBan: string[] = [];
                    const reason = `Tài khoản của bạn đã bị cấm vì lý do: Nhắn tin quá thời gian quy định`;
                    stringBan.push(reason);
                    stringBan.push(`Thời gian hành chính: 5h sáng đến 0h đêm`);
                    stringBan.push(`Nếu bạn muốn được hỗ trợ, vui lòng liên hệ với admin qua địa chỉ: m.me/nam077.me`);
                    stringBan.push(senderPsid);
                    await this.addBan(senderPsid, reason);
                    return {
                        checkBan: true,
                        data: stringBan,
                    };
                }
            }
            return {
                checkBan: false,
                data: null,
            };
        }
    }

    private getMultipleFontsToMessage(fonts: Font[]): string[] {
        const stringFonts: string[] = [];
        let stringFont = 'Danh sách font: \n\n';
        fonts.forEach((font: Font) => {
            stringFont += `Tên: ${font.name} \n Link: ${
                font.links[Math.floor(Math.random() * font.links.length)]
            } \n\n`;
        });
        stringFonts.push(stringFont);
        return stringFonts;
    }

    private async functionAdmin(senderPsid: string, message: string): Promise<AdminFunction> {
        const psidAdmin: string = await this.configsService.getConfigString('PSID_ADMIN');
        if (psidAdmin == senderPsid) {
            if (message.includes('@nvn ban')) {
                //@nvn ban psid reason or @nvn ban psid
                const validate: string = message.replace('@nvn ban ', '');
                if (validate.includes('on')) {
                    await this.configsService.updateConfig('CAN_BAN', '1');
                    return {
                        typeFunction: 'ON_BAN',
                        message: 'Đã bật chức năng cấm',
                    };
                }
                if (validate.includes('off')) {
                    await this.configsService.updateConfig('CAN_BAN', '0');
                    return {
                        typeFunction: 'OFF_BAN',
                        message: 'Đã tắt chức năng cấm',
                    };
                }
                // @nvn ban psid reason
                const split: string[] = validate.split(' ');
                const psid: string = split[0];
                if (split.length > 1) {
                    const reason: string = validate.replace(psid, '');
                    await this.addBan(psid, reason);
                    return {
                        typeFunction: 'ADD_BAN',
                        message: `Đã cấm thành công ${psid}`,
                        senderPsid: psid,
                    };
                } else {
                    const reason = 'Vi phạm quy định của admin';
                    await this.addBan(psid, reason);
                    return {
                        typeFunction: 'ADD_BAN',
                        message: `Đã cấm thành công ${psid}`,
                        senderPsid: psid,
                    };
                }
            }
            if (message.includes('@nvn unban')) {
                //@nvn unban psid
                const psid: string = message.replace('@nvn unban ', '');
                const banDelete = await this.banService.deleteByPsid(psid);
                if (banDelete) {
                    return {
                        typeFunction: 'REMOVE_BAN',
                        message: `Đã xóa thành công ${psid}`,
                        senderPsid: psid,
                    };
                }
                return {
                    typeFunction: 'REMOVE_BAN',
                    message: `Không tìm thấy ${psid}`,
                };
            }
            if (message.includes('@nvn bot')) {
                //@nvn bot on or @nvn bot off
                const validate: string = message.replace('@nvn bot ', '');
                if (validate.includes('on')) {
                    await this.configsService.updateConfig('BOT_CAN_MESSAGE', '1');
                    return {
                        typeFunction: 'ON_BOT',
                        message: 'Đã bật bot',
                    };
                }
                if (validate.includes('off')) {
                    await this.configsService.updateConfig('BOT_CAN_MESSAGE', '0');
                    return {
                        typeFunction: 'OFF_BOT',
                        message: 'Đã tắt bot',
                    };
                }
            }
            if (message.includes('@nvn font')) {
                //@nvn font on or @nvn font off
                const validate: string = message.replace('@nvn font ', '');
                if (validate.includes('on')) {
                    await this.configsService.updateConfig('CAN_FONT', '1');
                    return {
                        typeFunction: 'ON_DOWNLOAD_MULTIPLE_FONT',
                        message: 'Đã bật chức năng tải nhiều font',
                    };
                }
                if (validate.includes('off')) {
                    await this.configsService.updateConfig('CAN_FONT', '0');
                    return {
                        typeFunction: 'OFF_DOWNLOAD_MULTIPLE_FONT',
                        message: 'Đã tắt chức năng tải nhiều font',
                    };
                }
            }
            if (message.includes('@nvn list ban')) {
                const listBan = await this.getBanToMessage();
                return {
                    typeFunction: 'LIST_BAN',
                    message: listBan,
                };
            }
        }
    }
}

export interface DataChat {
    fonts: Font[];
    communications: Communication[];
}

export interface BanCheck {
    checkBan: boolean;
    data: string[];
}

export interface AdminFunction {
    typeFunction: AdminFunctionType;
    message: string | string[];
    senderPsid?: string;
}

type AdminFunctionType =
    | 'ON_BAN'
    | 'OFF_BAN'
    | 'ADD_BAN'
    | 'REMOVE_BAN'
    | 'ON_DOWNLOAD_MULTIPLE_FONT'
    | 'OFF_DOWNLOAD_MULTIPLE_FONT'
    | 'ON_BOT'
    | 'LIST_BAN'
    | 'OFF_BOT';
