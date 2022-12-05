import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

export interface IProfile {
    first_name: string;
    last_name: string;
    profile_pic: string;
    locale: string;
    timezone: number;
    gender: string;
}

@Injectable()
export class MessengerService {
    constructor(private readonly httpService: HttpService) {}

    async callSendAPI(sender_psid: string, response: any): Promise<void> {
        const request_body = {
            recipient: {
                id: sender_psid,
            },
            message: response,
        };
        // send read message
        await this.sendReadMessage(sender_psid);
        await this.sendTypingOn(sender_psid);

        const result = await this.httpService
            .post(
                `https://graph.facebook.com/v15.0/me/messages?access_token=${process.env.PAGE_ACCESS_TOKEN}`,
                request_body,
            )
            .toPromise()
            .finally(() => {
                console.log('Sent message successfully!');
            })
            .catch((error) => {
                console.log('Have error when send message');
            });
        await this.sendTypingOff(sender_psid);
    }

    async sendTextMessage(sender_psid: string, message: string): Promise<void> {
        const response = {
            text: message,
        };
        await this.callSendAPI(sender_psid, response);
    }

    async sendImageMessage(sender_psid: string, image_url: string) {
        const response = {
            attachment: {
                type: 'image',
                payload: {
                    url: image_url,
                },
            },
        };
        await this.callSendAPI(sender_psid, response);
    }

    async sendTypingOn(sender_psid: string): Promise<void> {
        const request_body = {
            recipient: {
                id: sender_psid,
            },
            sender_action: 'typing_on',
        };

        await this.httpService
            .post(
                `https://graph.facebook.com/v15.0/me/messages?access_token=${process.env.PAGE_ACCESS_TOKEN}`,
                request_body,
            )
            .toPromise()
            .finally(() => {
                console.log('Sent typing on successfully!');
            })
            .catch((error) => {
                console.log('Have error when send typing on');
            });
    }

    async sendTypingOff(sender_psid: string): Promise<void> {
        const request_body = {
            recipient: {
                id: sender_psid,
            },
            sender_action: 'typing_off',
        };

        await this.httpService
            .post(
                `https://graph.facebook.com/v15.0/me/messages?access_token=${process.env.PAGE_ACCESS_TOKEN}`,
                request_body,
            )
            .toPromise()
            .finally(() => {
                console.log('Sent typing off successfully!');
            })
            .catch((error) => {
                console.log('Have error when send typing off');
            });
    }

    async sendReadMessage(sender_psid: string): Promise<void> {
        const request_body = {
            recipient: {
                id: sender_psid,
            },
            sender_action: 'mark_seen',
        };

        await this.httpService
            .post(
                `https://graph.facebook.com/v15.0/me/messages?access_token=${process.env.PAGE_ACCESS_TOKEN}`,
                request_body,
            )
            .toPromise()
            .finally(() => {
                console.log('Sent read message successfully!');
            })
            .catch((error) => {
                console.log('Have error when send read message');
            });
    }

    async getProfile(sender_psid: string): Promise<IProfile> {
        const result = await this.httpService
            .get(
                `https://graph.facebook.com/v15.0/${sender_psid}?fields=first_name,last_name,profile_pic,locale,timezone,gender&access_token=${process.env.PAGE_ACCESS_TOKEN}`,
            )
            .toPromise();
        if (result.data) {
            return result.data;
        }
        return null;
    }
}
