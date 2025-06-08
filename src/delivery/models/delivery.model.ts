import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Orders } from 'src/orders/models/order.model';

@Table({ tableName: 'delivery' })
export class Delivery extends Model {

  @ForeignKey(() => Orders)
  @Column({ type: DataType.BIGINT, allowNull: false })
  orderId: number;

  @BelongsTo(() => Orders)
  orders: Orders;

  @Column({ type: DataType.STRING(255), allowNull: false })
  place: string;

  @Column({ type: DataType.STRING(20), allowNull: false })
  phoneNumber: string;

  @Column({ type: DataType.STRING, allowNull: false })
  mapUrl: string;
}
