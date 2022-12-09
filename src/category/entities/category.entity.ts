import { BeforeCreate, BeforeUpdate, BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { FontCategory } from '../../through/entities/font-category.entity';
import { Font } from '../../font/entities/font.entity';
import { StringProvider } from '../../providers/string.provider';

@Table({ tableName: 'categories', timestamps: true, updatedAt: true, comment: 'This is a category table' })
export class Category extends Model<Category> {
    @Column({ primaryKey: true, autoIncrement: true, comment: 'This is a category id' })
    id: number;

    @Column({ allowNull: false, comment: 'This is a category name' })
    name: string;

    @Column({ allowNull: true, comment: 'This is a category description', type: DataType.TEXT('tiny') })
    description: string;

    @Column({ allowNull: true, comment: 'This is a category slug' })
    slug: string;

    @BelongsToMany(() => Font, () => FontCategory)
    fonts: Font[];

    @BeforeCreate
    static async createSlug(category: Category) {
        category.slug = StringProvider.slugify(category.name);
    }

    // sau khi cập nhật thì cũng cần cập nhật slug
    @BeforeUpdate
    static async updateSlug(category: Category) {
        category.slug = StringProvider.slugify(category.name);
    }
}
