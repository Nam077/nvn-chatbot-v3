import { Model, Table, Column, DataType, BelongsToMany } from 'sequelize-typescript';
import { FontMessage } from '../../through/entities/font-message.entity';
import { Font } from '../../font/entities/font.entity';
import { Communication } from '../../communication/entities/communication.entity';
import { CommunicationMessage } from '../../through/entities/communication-message.entity';

@Table({ tableName: 'messages', timestamps: true, updatedAt: true, comment: 'This is a message table' })
export class Message extends Model<Message> {
    @Column({ primaryKey: true, autoIncrement: true, comment: 'This is a message id' })
    id: number;

    @Column({ allowNull: false, comment: 'This is a message text', type: DataType.TEXT('long') })
    text: string;

    @BelongsToMany(() => Font, () => FontMessage)
    fonts: Font[];

    @BelongsToMany(() => Communication, () => CommunicationMessage)
    communications: Communication[];
}
