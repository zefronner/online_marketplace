import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Orders } from "src/orders/models/order.model";

@Table({ tableName: "payments" })
export class Payment extends Model<Payment> {

  @ForeignKey(() => Orders)
  @Column({ type: DataType.INTEGER, allowNull: false })
  orderId: number;

  @BelongsTo(() => Orders)
  orders: Orders

  @Column({ type: DataType.ENUM('card', 'paypal', 'cash'), allowNull: false })
  paymentMethod: string;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  amount: number;

  @Column({ type: DataType.ENUM('pending', 'paid', 'failed'), allowNull: false })
  paymentStatus: string;
}
