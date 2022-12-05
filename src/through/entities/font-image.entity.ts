import { Model, Table, BelongsTo, DataType, Column, ForeignKey } from 'sequelize-typescript';
import { Font } from '../../font/entities/font.entity';
import { Image } from '../../image/entities/image.entity';

@Table({ tableName: 'fonts-images', timestamps: true, updatedAt: true, comment: 'This is a font-image table' })
export class FontImage extends Model<FontImage> {
    @Column({ primaryKey: true, autoIncrement: true, comment: 'This is a font-image id' })
    id: number;
    @ForeignKey(() => Font)
    @Column({ type: DataType.INTEGER, allowNull: false, comment: 'This is a font id' })
    fontId: number;

    @BelongsTo(() => Font, 'fontId')
    font: Font;

    @ForeignKey(() => Image)
    @Column({ type: DataType.INTEGER, allowNull: false, comment: 'This is a image id' })
    imageId: number;

    @BelongsTo(() => Image, 'imageId')
    image: Image;
}
