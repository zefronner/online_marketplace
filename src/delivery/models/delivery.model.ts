import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'delivery' })
export class Delivery extends Model<Delivery> {
  @Column({ type: DataType.BIGINT, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.BIGINT, allowNull: false })
  orderId: number;

  @Column({ type: DataType.STRING(255), allowNull: false })
  place: string;

  @Column({ type: DataType.STRING(20), allowNull: false })
  phoneNumber: string;
}
