import { Model, Table, BelongsTo, Column, ForeignKey, DataType } from 'sequelize-typescript';
import { Font } from '../../font/entities/font.entity';
import { Link } from '../../link/entities/link.entity';

@Table({ tableName: 'fonts-links', timestamps: true, updatedAt: true, comment: 'This is a font-link table' })
export class FontLink extends Model<FontLink> {
    @Column({ primaryKey: true, autoIncrement: true, comment: 'This is a font-link id' })
    id: number;

    @ForeignKey(() => Font)
    @Column({ type: DataType.INTEGER, allowNull: false, comment: 'This is a font id' })
    fontId: number;

    @BelongsTo(() => Font, 'fontId')
    font: Font;

    @ForeignKey(() => Link)
    @Column({ type: DataType.INTEGER, allowNull: false, comment: 'This is a link id' })
    linkId: number;

    @BelongsTo(() => Link, 'linkId')
    link: Link;
}
