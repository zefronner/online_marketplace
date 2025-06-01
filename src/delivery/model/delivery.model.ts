import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'deliveries',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: false,
})
export class Delivery extends Model<Delivery> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column(DataType.STRING)
  address: string;

  @Column(DataType.STRING)
  phone: string;

  @Column({
    type: DataType.STRING,
    defaultValue: 'pending',
  })
  status: string;

  @Column(DataType.INTEGER)
  orderId: number;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  createdAt: Date;
}
