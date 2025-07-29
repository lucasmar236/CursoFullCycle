import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  tableName: "products",
  timestamps: false,
})
export class ProductModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  description: string;

  @Column({ allowNull: true })
  salesPrice: number;

  @Column({ allowNull: true })
  purchasePrice?: number;


  @Column({ allowNull: true })
  stock?: number;

  @Column({ allowNull: true })
  createdAt?: Date;

  @Column({ allowNull: true })
  updatedAt?: Date;

}
