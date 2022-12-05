import { Model, Table, Column, DataType, BelongsToMany } from 'sequelize-typescript';
import { Font } from '../../font/entities/font.entity';
import { FontKey } from '../../through/entities/font-key.entity';
import { Communication } from '../../communication/entities/communication.entity';
import { CommunicationKey } from '../../through/entities/communication-key.entity';

@Table({ tableName: 'keys', timestamps: true, updatedAt: true, comment: 'This is a key table' })
export class Key extends Model<Key> {
    @Column({ primaryKey: true, autoIncrement: true, comment: 'This is a key id' })
    id: number;

    @Column({ allowNull: false, comment: 'This is a key name' })
    name: string;

    @Column({ allowNull: false, comment: 'This is a key value', type: DataType.TEXT('tiny'), unique: true })
    value: string;

    @BelongsToMany(() => Font, () => FontKey)
    fonts: Font[];

    @BelongsToMany(() => Communication, () => CommunicationKey)
    communications: Communication[];
}
