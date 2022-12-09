import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'list_fonts', timestamps: true, updatedAt: true, comment: 'This is a list_font table' })
export class ListFont extends Model<ListFont> {
    @Column({ primaryKey: true, autoIncrement: true, comment: 'This is a list_font id' })
    id: number;

    @Column({ type: DataType.TEXT('long'), allowNull: false, comment: 'This is a list_font value' })
    value: string;
}
