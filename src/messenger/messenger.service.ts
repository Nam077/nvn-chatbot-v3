import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigsService } from '../config/config.service';
import { HttpService } from '@nestjs/axios';
import { Key } from '../key/entities/key.entity';
import { type } from 'os';
import { Font } from '../font/entities/font.entity';

@Injectable()
export class MessengerService {
    private pageAccessToken: string;
    private apiVersion = 'v15.0';
    private headers;
    private verifyToken = 'verify_token';
    private keys: Key[];

    constructor(private readonly configsService: ConfigsService, private readonly httpService: HttpService) {
        this.init().catch();
    }

    getWebHook(mode: string, challenge: string, verifyToken: string) {
        if (mode && verifyToken === this.verifyToken) {
            return challenge;
        }
        throw new ForbiddenException("Can't verify token");
    }

    public async init() {
        this.pageAccessToken = await this.configsService.getPageAccessToken();
        this.headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.pageAccessToken}`,
        };
    }

    async sendTextMessage(senderPsid, text) {
        const response = {
            text,
        };
        await this.callSendAPI(senderPsid, response);
    }

    async sendImageMessage(senderPsid, imageUrl) {
        const response = {
            attachment: {
                type: 'image',
                payload: {
                    url: imageUrl,
                },
            },
        };
        await this.callSendAPI(senderPsid, response);
    }

    async callSendAPI(senderPsid, response): Promise<void> {
        const requestBody = {
            recipient: {
                id: senderPsid,
            },
            message: response,
        };
        await this.sendMarkSeen(senderPsid);
        await this.sendTypingOn(senderPsid);
        try {
            await this.httpService
                .post(`https://graph.facebook.com/${this.apiVersion}/me/messages`, requestBody, {
                    headers: this.headers,
                })
                .toPromise()
                .catch();
        } catch (e) {
            console.log("Can't send message!");
        } finally {
            await this.sendTypingOff(senderPsid);
        }
    }

    async sendTypingOn(senderPsid): Promise<void> {
        const requestBody = {
            recipient: {
                id: senderPsid,
            },
            sender_action: 'typing_on',
        };
        return new Promise(async (resolve, reject) => {
            await this.httpService
                .post(`https://graph.facebook.com/${this.apiVersion}/me/messages`, requestBody, {
                    headers: this.headers,
                })
                .toPromise()
                .then(() => resolve())
                .catch(() => reject());
        });
    }

    async sendTypingOff(senderPsid): Promise<void> {
        const requestBody = {
            recipient: {
                id: senderPsid,
            },
            sender_action: 'typing_off',
        };
        try {
            return new Promise(async (resolve, reject) => {
                await this.httpService
                    .post(`https://graph.facebook.com/${this.apiVersion}/me/messages`, requestBody, {
                        headers: this.headers,
                    })
                    .toPromise()
                    .then(() => resolve())
                    .catch(() => reject());
            });
        } catch (e) {
            console.log("Can't send typing off!");
        }
    }

    async sendMarkSeen(senderPsid): Promise<void> {
        const requestBody = {
            recipient: {
                id: senderPsid,
            },
            sender_action: 'mark_seen',
        };
        try {
            return new Promise(async (resolve, reject) => {
                await this.httpService
                    .post(`https://graph.facebook.com/${this.apiVersion}/me/messages`, requestBody, {
                        headers: this.headers,
                    })
                    .toPromise()
                    .then(() => resolve())
                    .catch(() => reject());
            });
        } catch (e) {
            console.log("Can't send mark seen!");
        }
    }

    async getUserProfile(senderPsid): Promise<UserProfile> {
        try {
            const response = await this.httpService
                .get(`https://graph.facebook.com/${this.apiVersion}/${senderPsid}`, {
                    params: {
                        fields: 'first_name,last_name,name,profile_pic,id',
                        access_token: this.pageAccessToken,
                    },
                })
                .toPromise();
            return response.data;
        } catch (e) {
            console.log("Can't get user profile!");
        }
    }

    async setGetStartedButton() {
        const requestBody = {
            get_started: {
                payload: 'GET_STARTED',
            },
            greeting: [
                {
                    locale: 'default',
                    text: 'Xin ch??o b???n ???? ?????n v???i NVN Font! b???n c?? th??? g???i tin nh???n cho NVN Font ????? s??? d???ng bot m???t c??ch mi???n ph??!',
                },
                {
                    locale: 'en_US',
                    text: 'Hi, welcome to NVN Font! You can send message to NVN Font to use bot for free!',
                },
            ],
        };
        try {
            await this.httpService.post(
                `https://graph.facebook.com/${this.apiVersion}/me/messenger_profile`,
                requestBody,
                {
                    headers: this.headers,
                },
            );
        } catch (e) {
            console.log("Can't set get started button!");
        }
    }

    public async setPersistentMenu() {
        //using axios to send message to facebook
        try {
            await this.httpService
                .post(
                    'https://graph.facebook.com/v9.0/me/messenger_profile',
                    {
                        persistent_menu: [
                            {
                                locale: 'default',
                                composer_input_disabled: false,
                                call_to_actions: [
                                    {
                                        type: 'postback',
                                        title: 'Kh???i ?????ng l???i bot',
                                        payload: 'RESTART_BOT',
                                    },
                                    {
                                        type: 'postback',
                                        title: 'Mua t???ng h???p c???a NVN',
                                        payload: 'BOT_BUY',
                                    },
                                    {
                                        type: 'postback',
                                        title: 'Xem c??c font m???i nh???t',
                                        payload: 'LIST_FONT_IMAGE_END',
                                    },
                                    {
                                        type: 'postback',
                                        title: 'Danh s??ch font h??? tr???',
                                        payload: 'LIST_FONT',
                                    },
                                    {
                                        type: 'postback',
                                        title: 'Xem Demo Danh S??ch Font',
                                        payload: 'LIST_FONT_IMAGE',
                                    },
                                    {
                                        type: 'web_url',
                                        title: 'Tham gia group',
                                        url: 'https://www.facebook.com/groups/NVNFONT/',
                                        webview_height_ratio: 'full',
                                    },
                                    {
                                        type: 'postback',
                                        title: 'Xem h?????ng d???n s??? d???ng bot',
                                        payload: 'BOT_TUTORIAL',
                                    },
                                    {
                                        type: 'postback',
                                        title: 'Xem gi?? Vi???t h??a',
                                        payload: 'PRICE_SERVICE',
                                    },
                                    {
                                        type: 'web_url',
                                        title: 'Xem Trang',
                                        url: 'https://www.facebook.com/NVNFONT/',
                                        webview_height_ratio: 'full',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: 'Bearer ' + this.pageAccessToken,
                        },
                    },
                )
                .toPromise();
        } catch (error) {
            console.log('Error when set up persistent menu');
        } finally {
            console.log('Set up persistent menu success');
        }
    }

    async postWebHook(body: any) {
        if (body.object == 'page') {
            for (const entry of body.entry) {
                const webhookEvent = entry.messaging[0];
                const senderPsid = webhookEvent.sender.id;
                if (webhookEvent.message && webhookEvent.message.quick_reply) {
                    const receivedQuickReply: ReceivedQuickReply = webhookEvent.message.quick_reply;
                    await this.handleQuickReply(senderPsid, receivedQuickReply);
                }
                if (webhookEvent.message) {
                    if (webhookEvent.message.text) {
                        const receivedMessage: ReceivedMessage = webhookEvent.message;
                        await this.handleMessage(senderPsid, receivedMessage);
                    }
                    if (webhookEvent.message.attachments) {
                        const receivedAttachment: ReceivedAttachment = webhookEvent.message;
                        await this.handleAttachment(senderPsid, receivedAttachment);
                    }
                } else if (webhookEvent.postback) {
                    const receivedPostback: ReceivedPostback = webhookEvent.postback;
                    await this.handlePostback(senderPsid, receivedPostback);
                }
            }
            return 'EVENT_RECEIVED';
        }
    }

    private async handlePostback(senderPsid: string, receivedPostback: any) {
        console.log(receivedPostback);
        const payload = receivedPostback.payload;
        switch (payload) {
            case 'GET_STARTED_PAYLOAD':
                await this.sendTextMessage(senderPsid, 'Ch??o m???ng b???n ?????n v???i NVN Font!');
                break;
            case 'RESTART_BOT':
                await this.sendTextMessage(senderPsid, 'B???n ???? kh???i ?????ng l???i bot th??nh c??ng!');
                break;
            case 'BOT_BUY':
                await this.sendTextMessage(
                    senderPsid,
                    'B???n c?? th??? mua t???ng h???p c???a NVN t???i ????y: https://www.facebook.com/NVNFONT/',
                );
                break;
            case 'LIST_FONT_IMAGE_END':
                await this.sendTextMessage(
                    senderPsid,
                    'B???n c?? th??? xem c??c font m???i nh???t t???i ????y: https://www.facebook.com/NVNFONT/',
                );
                break;
            case 'LIST_FONT':
                await this.sendTextMessage(
                    senderPsid,
                    'B???n c?? th??? xem danh s??ch font h??? tr??? t???i ????y: https://www.facebook.com/NVNFONT/',
                );
                break;
            case 'LIST_FONT_IMAGE':
                await this.sendTextMessage(
                    senderPsid,
                    'B???n c?? th??? xem demo danh s??ch font t???i ????y: https://www.facebook.com/NVNFONT/',
                );
                break;
            case 'BOT_TUTORIAL':
                await this.sendTextMessage(
                    senderPsid,
                    'B???n c?? th??? xem h?????ng d???n s??? d???ng bot t???i ????y: https://www.facebook.com/NVNFONT/',
                );
                break;
            case 'PRICE_SERVICE':
                await this.sendTextMessage(
                    senderPsid,
                    'B???n c?? th??? xem gi?? Vi???t h??a t???i ????y: https://www.facebook.com/NVNFONT/',
                );
                break;
            default:
                await this.sendTextMessage(
                    senderPsid,
                    'B???n c?? th??? xem trang t???i ????y: https://www.facebook.com/NVNFONT/',
                );
        }
    }

    private async handleMessage(senderPsid: string, receivedMessage: ReceivedMessage) {
        const user = await this.getUserProfile(senderPsid);
        const message = receivedMessage.text;
        await this.sendTextMessage(senderPsid, `Ch??o b???n ${user.name}! b???n ???? g???i tin nh???n: ${message}`);
    }

    private async handleQuickReply(senderPsid: string, receivedQuickReply: ReceivedQuickReply) {
        console.log(receivedQuickReply);
        const payload = receivedQuickReply.payload;
        console.log('payload: ', payload);
        if (payload === 'RESTART_BOT') {
            await this.sendTextMessage(senderPsid, 'Kh???i ?????ng l???i bot th??nh c??ng!');
        }
    }

    async test(senderPsid: string) {
        await this.sendTextMessage(senderPsid, '??ang x??? l??...');
    }

    async getInfo(id: string) {
        return await this.getUserProfile(id);
    }

    async setUp() {
        await this.setGetStartedButton();
        await this.setPersistentMenu();
    }

    private async handleAttachment(senderPsid: any, receivedAttachment: ReceivedAttachment) {
        const url = receivedAttachment.attachments[0].payload.url;
        const user = await this.getUserProfile(senderPsid);
        await this.sendTextMessage(senderPsid, `Ch??o b???n ${user.name}! b???n ???? g???i ???nh: ${url}`);
        await this.sendImageMessage(senderPsid, url);
    }

    private async sendAttachmentMessage(recipientId: string, attachment: Attachment) {
        const response = {
            attachment,
        };
        await this.callSendAPI(recipientId, response);
    }

    private async sendSingleFont(senderPsid: string, font: Font, userProfile: UserProfile) {
        const message: string =
            `Ch??o b???n ${userProfile.name}! \n` +
            `T??? l?? bot c???a NVN Font n??` +
            `T??? ???? t??m th???y font ${font.name} cho b???n! \n` +
            `Link download font: ${font.links[Math.floor(Math.random() * font.links.length)]} \n` +
            `B???n c?? th??? xem th??m font t???i ????y: fb.com/nvnfont` +
            `#NVNFONT`;
        const response = {
            attachment: {
                type: 'template',
                payload: {
                    template_type: 'button',
                    elements: [
                        {
                            text: message,
                            buttons: [
                                {
                                    type: 'web_url',
                                    url: font.links[Math.floor(Math.random() * font.links.length)],
                                    title: 'T???i v???',
                                },
                                {
                                    type: 'postback',
                                    title: 'Danh s??ch font',
                                    payload: 'LIST_FONT',
                                },
                                {
                                    type: 'postback',
                                    title: 'Danh s??ch font c?? ???nh',
                                    payload: 'LIST_FONT_IMAGE',
                                },
                            ],
                        },
                    ],
                },
            },
        };
        await this.callSendAPI(senderPsid, response);
    }

    public async sendGreeting(sender_psid: string, userProfile: UserProfile) {
        const date = new Date();
        date.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
        const hour = date.getHours();
        if (hour >= 5 && hour < 10) {
            await this.sendTextMessage(sender_psid, `Ch??o ${userProfile.name}, ch??c b???n m???t bu???i s??ng t???t l??nh!`);
        } else if (hour >= 10 && hour <= 12) {
            await this.sendTextMessage(sender_psid, `Ch??o ${userProfile.name}, b???n ???? ??n tr??a ch??a?`);
        } else if (hour > 12 && hour < 18) {
            await this.sendTextMessage(sender_psid, `Ch??o ${userProfile.name}, ch??c b???n m???t bu???i chi???u t???t l??nh!`);
        } else if (hour >= 18 && hour < 22) {
            await this.sendTextMessage(
                sender_psid,
                `Ch??o ${userProfile.name}, ch??c b???n m???t bu???i t???i t???t l??nh, b???n ???? ??n t???i ch??a?`,
            );
        } else if (hour >= 22 && hour < 24) {
            await this.sendTextMessage(
                sender_psid,
                `Ch??o ${userProfile.name}, khuya r???i l??m vi???c ??t th??i n??, ??i ng??? ??i!`,
            );
        } else if (hour >= 0 && hour < 5) {
            await this.sendTextMessage(
                sender_psid,
                `Ch??o ${name}, N???u b???n nh???n tin gi??? n??y th?? ??ang l??m phi???n m??nh ????y kh??ng n??n nh??!`,
            );
        }
    }
}

export interface UserProfile {
    first_name: string;
    last_name: string;
    profile_pic: string;
    name: string;
    id: string;
}

export interface ReceivedMessage {
    mid: string;
    text: string;
}

export interface ReceivedAttachment {
    type: string;
    attachments: Attachment[];
}

export interface Attachment {
    type: string;
    payload: {
        url: string;
    };
}

export interface ReceivedPostback {
    title: string;
    payload: string;
    mid: string;
}

export type ReceivedQuickReply = ReceivedPostback;
