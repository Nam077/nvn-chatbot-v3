import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'users', timestamps: true, updatedAt: true, comment: 'This is a user table' })
export class User extends Model<User> {
    @Column({ primaryKey: true, autoIncrement: true, comment: 'This is a user id' })
    id: number;

    @Column({ allowNull: false, comment: 'This is a user name' })
    name: string;

    @Column({ allowNull: false, comment: 'This is a user email' })
    email: string;

    @Column({ allowNull: false, comment: 'This is a user password', type: DataType.TEXT('tiny') })
    password: string;

    @Column({ allowNull: false, comment: 'This is a user role', type: DataType.ENUM('admin', 'user') })
    role: string;

    @Column({ allowNull: false, comment: 'This is a user status', type: DataType.ENUM('active', 'inactive') })
    status: string;
}
