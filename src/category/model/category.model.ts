import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Product } from "src/product/models/product.model";

@Table({ tableName: 'category' })
export class Category extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description!: string;

  @HasMany(() => Product)
  products!: Product[];
}
