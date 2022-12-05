import { Model, Table, Column, DataType } from 'sequelize-typescript';

@Table({ tableName: 'foods', timestamps: true, updatedAt: true, comment: 'This is a font table' })
export class Food extends Model<Food> {
    @Column({ primaryKey: true, autoIncrement: true, comment: 'This is a food id' })
    id: number;

    @Column({ allowNull: false, comment: 'This is a food name' })
    name: string;

    @Column({ allowNull: true, comment: 'This is a food description', type: DataType.TEXT('tiny') })
    description: string;

    @Column({ allowNull: true, comment: 'This is a food slug' })
    slug: string;

    @Column({ allowNull: true, comment: 'This is a food image' })
    image: string;

    @Column({ allowNull: true, comment: 'This is a food recipe', type: DataType.TEXT('medium') })
    recipe: string;
}
