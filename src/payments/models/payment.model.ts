import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'payments' })
export class Payment extends Model<Payment> {
  @Column({ type: DataType.BIGINT, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.BIGINT, allowNull: false })
  orderId: number;

  @Column({ type: DataType.ENUM('card', 'paypal', 'cash'), allowNull: false })
  paymentMethod: 'card' | 'paypal' | 'cash';

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  amount: number;

  @Column({ type: DataType.ENUM('pending', 'paid', 'failed'), allowNull: false })
  paymentStatus: 'pending' | 'paid' | 'failed';

  @Column({ type: DataType.DATE, allowNull: false })
  paidAt: Date;
}
