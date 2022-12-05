import { Model, Table, Column, DataType } from 'sequelize-typescript';

@Table({ tableName: 'bans', timestamps: true, updatedAt: true, comment: 'This is a ban table' })
export class Ban extends Model<Ban> {
    @Column({ primaryKey: true, autoIncrement: true, comment: 'This is a ban id' })
    id: number;
    @Column({ allowNull: false, comment: 'This is a ban reason', type: DataType.TEXT('tiny') })
    reason: string;
    @Column({ allowNull: false, comment: 'This is a ban user id', type: DataType.INTEGER })
    psid: number;
}
