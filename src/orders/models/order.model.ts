import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { OrderStatus, Status } from "src/enum";
// import { User } from './user.model'
// import { Product } from './product.model'

@Table({ tableName: 'orders' })
export class Orders extends Model {
    // @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    userId: number;

    // @BelongsTo(() => User)
    // user: User;

    @Column({
        type: DataType.ENUM,
        values: Object.values(OrderStatus),
        defaultValue: OrderStatus.PENDING,
        allowNull: false
    })
    status: OrderStatus;

    @Column({
        type: DataType.DECIMAL(6, 2),
        allowNull: false
    })
    totalPrice: number;

    // @ForeignKey(() => Product)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    productId: number;

    // @BelongsTo(() => Product)
    // product: Product;
}