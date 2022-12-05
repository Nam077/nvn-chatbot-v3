import { Column, DataType, Model, BelongsToMany, Table } from 'sequelize-typescript';
import { Category } from '../../category/entities/category.entity';
import { FontCategory } from '../../through/entities/font-category.entity';
import { Image } from '../../image/entities/image.entity';
import { FontImage } from '../../through/entities/font-image.entity';
import { Tag } from '../../tag/entities/tag.entity';
import { FontTag } from '../../through/entities/font-tag.entity';
import { Link } from '../../link/entities/link.entity';
import { FontLink } from '../../through/entities/font-link.entity';
import { Message } from '../../message/entities/message.entity';
import { FontMessage } from '../../through/entities/font-message.entity';

@Table({ tableName: 'fonts', timestamps: true, updatedAt: true, comment: 'This is a font table' })
export class Font extends Model<Font> {
    @Column({ primaryKey: true, autoIncrement: true, comment: 'This is a font id' })
    id: number;

    @Column({ allowNull: false, comment: 'This is a font name', unique: true })
    name: string;

    @Column({ allowNull: true, comment: 'This is a font description', type: DataType.TEXT('tiny') })
    description: string;

    @Column({ allowNull: true, comment: 'This is a font slug' })
    slug: string;

    @Column({ allowNull: false, comment: 'This is a font post_url', type: DataType.TEXT('tiny') })
    post_url: string;

    @BelongsToMany(() => Category, () => FontCategory)
    categories: Category[];

    @BelongsToMany(() => Image, () => FontImage)
    images: Image[];

    @BelongsToMany(() => Tag, () => FontTag)
    tags: Tag[];

    @BelongsToMany(() => Link, () => FontLink)
    links: Link[];

    @BelongsToMany(() => Message, () => FontMessage)
    messages: Message[];
}
