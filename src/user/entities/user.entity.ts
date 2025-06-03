import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'Users', timestamps: true })
export class User extends Model<User> {
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id:number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.ENUM('customer', 'admin'),
    allowNull: false,
  })
  role: string;
}
