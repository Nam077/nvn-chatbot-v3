import { Model, Table, Column, BelongsTo, DataType, ForeignKey } from 'sequelize-typescript';
import { Category } from '../../category/entities/category.entity';
import { Font } from '../../font/entities/font.entity';

@Table({ tableName: 'fonts-categories', timestamps: true, updatedAt: true, comment: 'This is a font-category table' })
export class FontCategory extends Model<FontCategory> {
    @Column({ primaryKey: true, autoIncrement: true, comment: 'This is a font-category id' })
    id: number;

    @ForeignKey(() => Font)
    @Column({ type: DataType.INTEGER, allowNull: false, comment: 'This is a font id' })
    fontId: number;

    @BelongsTo(() => Font, 'fontId')
    font: Font;

    @ForeignKey(() => Category)
    @Column({ type: DataType.INTEGER, allowNull: false, comment: 'This is a category id' })
    categoryId: number;

    @BelongsTo(() => Category, 'categoryId')
    category: Category;
}
