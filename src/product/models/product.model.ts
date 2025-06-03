import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Category } from "src/category/model/category.model";

@Table({tableName: 'product'})
export class Product extends Model{
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name: string;

    @Column({
        type: DataType.FLOAT,
        allowNull: false
    })
    price: string

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

}