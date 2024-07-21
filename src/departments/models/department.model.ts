import {Column, CreatedAt, DataType, HasMany, Model, Table, UpdatedAt} from "sequelize-typescript";
import {User} from "src/users/models/user.model";

@Table({tableName: 'departments', timestamps: true})
export class Department extends Model<Department> {
  @Column({primaryKey: true, autoIncrement: true, type: DataType.INTEGER, allowNull: false})
  id: number;

  @Column({type: DataType.STRING, allowNull: false})
  name: string;

  @Column({type: DataType.STRING, allowNull: true})
  description: string;

  @CreatedAt
  createdAt: Date;

  @Column({type: DataType.INTEGER, allowNull: true})
  createdBy: number;

  @UpdatedAt
  updatedAt: Date;

  @Column({type: DataType.INTEGER, allowNull: true})
  updatedBy: number;

  @Column({type: DataType.BOOLEAN, defaultValue: false})
  isDeleted: boolean

  @HasMany(() => User)
  users: User[];
}