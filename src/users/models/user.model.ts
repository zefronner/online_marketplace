import { Table, Model, Column, DataType, HasMany } from "sequelize-typescript";
import { UserRoles } from "src/enum";
import { Review } from "src/reviews/model/review.model";

@Table({ tableName: 'users' })
export class User extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    full_name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    email: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    hashed_password: string;

    @Column({
        type: DataType.ENUM(UserRoles.CUSTOMER, UserRoles.SAILER),
        allowNull: false
    })
    role: UserRoles;

    @Column({
        type: DataType.STRING,
      })
    image: string;

    @HasMany(() => Review)
    reviews: Review[];
}