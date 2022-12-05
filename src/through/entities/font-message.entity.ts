import { Model, Table, Column, BelongsTo, ForeignKey, DataType } from 'sequelize-typescript';
import { Font } from '../../font/entities/font.entity';
import { Message } from '../../message/entities/message.entity';

@Table({ tableName: 'fonts-messages', timestamps: true, updatedAt: true, comment: 'This is a font-message table' })
export class FontMessage extends Model<FontMessage> {
    @Column({ primaryKey: true, autoIncrement: true, comment: 'This is a font-message id' })
    id: number;
    @ForeignKey(() => Font)
    @Column({ type: DataType.INTEGER, allowNull: false, comment: 'This is a font id' })
    fontId: number;

    @BelongsTo(() => Font, 'fontId')
    font: Font;

    @ForeignKey(() => Message)
    @Column({ type: DataType.INTEGER, allowNull: false, comment: 'This is a message id' })
    messageId: number;

    @BelongsTo(() => Message, 'messageId')
    message: Message;
}
