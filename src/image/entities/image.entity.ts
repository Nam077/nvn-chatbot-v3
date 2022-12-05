import { Model, Table, Column, DataType, BelongsToMany } from 'sequelize-typescript';
import { FontImage } from '../../through/entities/font-image.entity';
import { Font } from '../../font/entities/font.entity';
import { Communication } from '../../communication/entities/communication.entity';
import { CommunicationImage } from '../../through/entities/communication-image.entity';

@Table({ tableName: 'images', timestamps: true, updatedAt: true, comment: 'This is a image table' })
export class Image extends Model<Image> {
    @Column({ primaryKey: true, autoIncrement: true, comment: 'This is a image id' })
    id: number;

    @Column({ allowNull: false, comment: 'This is a image name' })
    name: string;

    @Column({ allowNull: false, comment: 'This is a image url', type: DataType.TEXT('tiny') })
    url: string;

    @BelongsToMany(() => Font, () => FontImage)
    fonts: Font[];

    @BelongsToMany(() => Communication, () => CommunicationImage)
    communications: Communication[];
}
