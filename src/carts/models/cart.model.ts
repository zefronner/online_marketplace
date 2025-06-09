import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Product } from 'src/product/models/product.model';
import { User } from 'src/users/models/user.model';

@Table({ tableName: 'cart' })
export class Cart extends Model {
  @ForeignKey(() => User)
  @Column({ type: DataType.BIGINT, allowNull: false })
  userId: number;

  @BelongsTo(() => User)
  user: User;  

  @ForeignKey(() => Product)
  @Column({ type: DataType.BIGINT, allowNull: false })
  productId: number;

  @BelongsTo(() => Product)
  products: Product;

  @Column({ type: DataType.INTEGER, allowNull: false })
  amount: number;
}
