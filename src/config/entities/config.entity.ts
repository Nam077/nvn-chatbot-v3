import { Model, Table, Column, DataType, AfterFind } from 'sequelize-typescript';

@Table({ tableName: 'config', timestamps: true, updatedAt: true, comment: 'This is a config table' })
export class Configs extends Model<Configs> {
    @Column({ primaryKey: true, autoIncrement: true, comment: 'This is a config id' })
    id: number;

    @Column({ allowNull: false, comment: 'This is a config name', unique: true })
    name: string;

    @Column({ allowNull: false, comment: 'This is a config value', type: DataType.INTEGER })
    value: boolean | number | string;
}
