import { Model, Table, Column, BelongsTo, ForeignKey, DataType } from 'sequelize-typescript';
import { Communication } from '../../communication/entities/communication.entity';
import { Key } from '../../key/entities/key.entity';

@Table({
    tableName: 'communications-keys',
    timestamps: true,
    updatedAt: true,
    comment: 'This is a communication-key table',
})
export class CommunicationKey extends Model<CommunicationKey> {
    @Column({
        primaryKey: true,
        autoIncrement: true,
        comment: 'This is a communication-key id',
    })
    id: number;

    @ForeignKey(() => Communication)
    @Column({ type: DataType.INTEGER, comment: 'This is a communication id' })
    communicationId: number;

    @BelongsTo(() => Communication, 'communicationId')
    communication: Communication;

    @ForeignKey(() => Key)
    @Column({ type: DataType.INTEGER, comment: 'This is a key id' })
    keyId: number;

    @BelongsTo(() => Key, 'keyId')
    key: Key;
}
