import { Column, Table, Model, BelongsTo, ForeignKey, DataType } from 'sequelize-typescript';
import { Message } from '../../message/entities/message.entity';
import { Communication } from '../../communication/entities/communication.entity';

@Table({
    tableName: 'communications-messages',
    timestamps: true,
    updatedAt: true,
    comment: 'This is a communication-message table',
})
export class CommunicationMessage extends Model<CommunicationMessage> {
    @Column
    communication_id: number;

    @Column
    message_id: number;

    @ForeignKey(() => Communication)
    @Column({ type: DataType.INTEGER, comment: 'This is a communication id' })
    communicationId: number;

    @BelongsTo(() => Message)
    message: Message;

    @ForeignKey(() => Message)
    @Column({ type: DataType.INTEGER, comment: 'This is a message id' })
    messageId: number;

    @BelongsTo(() => Communication)
    communication: Communication;
}
