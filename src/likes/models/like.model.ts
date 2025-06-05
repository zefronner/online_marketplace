// src/likes/like.model.ts
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'likes', timestamps: true })
export class Like extends Model<Like> {
  @Column({ type: DataType.BIGINT, allowNull: false })
  userId: number;

  @Column({ type: DataType.BIGINT, allowNull: false })
  productId: number;
}
