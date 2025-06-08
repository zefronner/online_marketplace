import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Delivery } from "src/delivery/models/delivery.model";
import { OrderStatus, Status } from "src/enum";
import { Payment } from "src/payments/models/payment.model";
import { Product } from "src/product/models/product.model";
import { User } from "src/users/models/user.model";

@Table({ tableName: 'orders' })
export class Orders extends Model {
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    userId: number;

    @BelongsTo(() => User)
    user: User[];

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

    @ForeignKey(() => Product)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    productId: number;

    @BelongsTo(() => Product)
    product: Product[];

    @HasMany(() => Delivery)
    delivery: Delivery;

    @HasMany(() => Payment)
    payment: Payment;
}