import { Model, Column, Table, DataType, BelongsToMany } from 'sequelize-typescript';
import { FontLink } from '../../through/entities/font-link.entity';
import { Font } from '../../font/entities/font.entity';

@Table({ tableName: 'links', timestamps: true, updatedAt: true, comment: 'This is a link table' })
export class Link extends Model<Link> {
    @Column({ primaryKey: true, autoIncrement: true, comment: 'This is a link id' })
    id: number;

    @Column({ type: DataType.STRING, allowNull: false, comment: 'This is a link name' })
    name: string;

    @Column({ type: DataType.TEXT('tiny'), allowNull: false, comment: 'This is a link url', unique: true })
    url: string;

    @BelongsToMany(() => Font, () => FontLink)
    fonts: Font[];
}
