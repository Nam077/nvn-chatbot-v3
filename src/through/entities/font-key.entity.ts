import { Model, Column, BelongsTo, DataType, Table, ForeignKey } from 'sequelize-typescript';
import { Font } from '../../font/entities/font.entity';
import { Key } from '../../key/entities/key.entity';

@Table({ tableName: 'fonts-keys', timestamps: true, updatedAt: true, comment: 'This is a font-key table' })
export class FontKey extends Model<FontKey> {
    @Column({ primaryKey: true, autoIncrement: true, comment: 'This is a font-key id' })
    id: number;

    @ForeignKey(() => Font)
    @Column({ type: DataType.INTEGER, allowNull: false, comment: 'This is a font id' })
    fontId: number;

    @BelongsTo(() => Font, 'fontId')
    font: Font;

    @ForeignKey(() => Key)
    @Column({ type: DataType.INTEGER, allowNull: false, comment: 'This is a key id' })
    keyId: number;

    @BelongsTo(() => Key, 'keyId')
    key: Key;
}
