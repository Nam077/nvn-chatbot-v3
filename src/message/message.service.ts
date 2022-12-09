import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Message } from './entities/message.entity';

@Injectable()
export class MessageService {
    constructor(@InjectModel(Message) private messageModel: typeof Message) {}

    async create(createMessageDto: CreateMessageDto): Promise<Message> {
        const [message, created] = await this.messageModel.findOrCreate({
            where: {
                text: createMessageDto.text,
            },
            defaults: createMessageDto,
        });
        return message;
    }

    async findAll(): Promise<Message[]> {
        return this.messageModel.findAll();
    }

    async findOne(id: number): Promise<Message> {
        return this.messageModel.findOne({ where: { id } });
    }

    async update(id: number, updateMessageDto: UpdateMessageDto): Promise<Message> {
        const message = await this.findOne(id);
        if (message) {
            return message.update(updateMessageDto);
        }
        throw new HttpException('Message not found', HttpStatus.NOT_FOUND);
    }

    async remove(id: number): Promise<Message> {
        const message = await this.findOne(id);
        if (message) {
            await message.destroy();
            return message;
        }
        throw new HttpException('Message not found', HttpStatus.NOT_FOUND);
    }

    async findAllByIds(message_ids: string[]): Promise<Message[]> {
        return this.messageModel.findAll({
            where: {
                id: message_ids,
            },
        });
    }
}
