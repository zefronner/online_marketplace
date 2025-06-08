import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'cart' })
export class Cart extends Model<Cart> {
  @Column({ type: DataType.BIGINT, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.BIGINT, allowNull: false })
  userId: number;

  @Column({ type: DataType.BIGINT, allowNull: false })
  productId: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  amount: number;

}
