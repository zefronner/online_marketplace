import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Category } from "src/category/model/category.model";
import { Orders } from "src/orders/models/order.model";
import { Review } from "src/reviews/model/review.model";

@Table({tableName: 'product'})
export class Product extends Model{
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name: string;

    @Column({
        type: DataType.DECIMAL(10,2),
        allowNull: false
    })
    price: number

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0,
        allowNull: false
    })
    inStock: number

    @ForeignKey(()=>Category)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    categoryId: number

    @BelongsTo(()=> Category,{
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    category: Category

    @HasMany(() => Review)
    reviews: Review[];

    @HasMany(() => Orders)
    orders: Orders
}