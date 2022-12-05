import { Model, Column, DataType, Table, BelongsToMany } from 'sequelize-typescript';
import { FontTag } from '../../through/entities/font-tag.entity';
import { Font } from '../../font/entities/font.entity';

@Table({ tableName: 'tags', timestamps: true, updatedAt: true, comment: 'This is a tag table' })
export class Tag extends Model<Tag> {
    @Column({ primaryKey: true, autoIncrement: true, comment: 'This is a tag id' })
    id: number;

    @Column({ allowNull: false, comment: 'This is a tag name' })
    name: string;

    @Column({ allowNull: true, comment: 'This is a tag description', type: DataType.TEXT('tiny') })
    description: string;

    @Column({ allowNull: true, comment: 'This is a tag slug' })
    slug: string;

    @BelongsToMany(() => Font, () => FontTag)
    fonts: Font[];
}
