import { Model, Table, Column, BelongsTo, ForeignKey, DataType } from 'sequelize-typescript';
import { Font } from '../../font/entities/font.entity';
import { Tag } from '../../tag/entities/tag.entity';

@Table({ tableName: 'fonts-tags', timestamps: true, updatedAt: true, comment: 'This is a font-tag table' })
export class FontTag extends Model<FontTag> {
    @Column({ primaryKey: true, autoIncrement: true, comment: 'This is a font-tag id' })
    id: number;

    @ForeignKey(() => Font)
    @Column({ type: DataType.INTEGER, allowNull: false, comment: 'This is a font id' })
    fontId: number;

    @BelongsTo(() => Font, 'fontId')
    font: Font;

    @ForeignKey(() => Tag)
    @Column({ type: DataType.INTEGER, allowNull: false, comment: 'This is a tag id' })
    tagId: number;

    @BelongsTo(() => Tag, 'tagId')
    tag: Tag;
}
