import { Model, Table, Column, DataType } from 'sequelize-typescript';
@Table({ tableName: 'keys', timestamps: true, updatedAt: true, comment: 'This is a key table' })
export class Key extends Model<Key> {
    @Column({ primaryKey: true, autoIncrement: true, comment: 'This is a key id' })
    id: number;

    @Column({ allowNull: false, comment: 'This is a key name' })
    name: string;

    @Column({ allowNull: false, comment: 'This is a key value', type: DataType.TEXT('tiny'), unique: true })
    value: string;
}
