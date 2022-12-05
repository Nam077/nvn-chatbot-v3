import { Model, Table, Column, DataType, BelongsToMany } from 'sequelize-typescript';
import { CommunicationMessage } from '../../through/entities/communication-message.entity';
import { Message } from '../../message/entities/message.entity';
import { CommunicationImage } from '../../through/entities/communication-image.entity';
import { Image } from '../../image/entities/image.entity';

@Table({ tableName: 'communications', timestamps: true, updatedAt: true, comment: 'This is a communication table' })
export class Communication extends Model<Communication> {
    @Column({ primaryKey: true, autoIncrement: true, comment: 'This is a communication id' })
    id: number;

    @Column({ allowNull: false, comment: 'This is a communication value', type: DataType.TEXT('tiny') })
    value: string;

    @BelongsToMany(() => Message, () => CommunicationMessage)
    messages: Message[];

    @BelongsToMany(() => Image, () => CommunicationImage)
    images: Image[];
}
