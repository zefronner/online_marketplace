import { Table, Model, Column, DataType, AllowNull } from "sequelize-typescript";

@Table({
  tableName: "Review"
})  

export class Review extends Model{
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  UserId: number;
  
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  ProductId: number;
  
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  Rating: number;
  
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  Comment: string; 
}