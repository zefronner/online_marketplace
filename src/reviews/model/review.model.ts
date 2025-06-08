import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Product } from "src/product/models/product.model";
import { User } from "src/users/models/user.model";

@Table({ tableName: 'reviews' })
export class Review extends Model {
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    userId: number;

    @ForeignKey(() => Product)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    productId: number;

    @Column({
        type: DataType.DECIMAL(2,1),
        allowNull: false,
    })
    rating: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    comment: string;

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Product)
    product: Product;
}