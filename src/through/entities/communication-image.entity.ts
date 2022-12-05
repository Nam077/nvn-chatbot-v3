import { Model, Table, Column, BelongsTo, ForeignKey, DataType } from 'sequelize-typescript';
import { Communication } from '../../communication/entities/communication.entity';
import { Image } from '../../image/entities/image.entity';

@Table({
    tableName: 'communications-images',
    timestamps: true,
    updatedAt: true,
    comment: 'This is a communication-image table',
})
export class CommunicationImage extends Model<CommunicationImage> {
    @Column({
        primaryKey: true,
        autoIncrement: true,
        comment: 'This is a communication-image id',
    })
    id: number;

    @ForeignKey(() => Communication)
    @Column({ type: DataType.INTEGER, comment: 'This is a communication id' })
    communicationId: number;

    @BelongsTo(() => Communication, 'communicationId')
    communication: Communication;

    @ForeignKey(() => Image)
    @Column({ type: DataType.INTEGER, comment: 'This is a image id' })
    imageId: number;

    @BelongsTo(() => Image, 'imageId')
    image: Image;
}
