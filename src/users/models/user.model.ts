import {
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  ForeignKey,
  HasMany,
  Model,
  Table,
  UpdatedAt
} from 'sequelize-typescript';
import {Role} from "src/common/types";

@Table({
  tableName: 'users',
  timestamps: true,
  paranoid: true
})
export class User extends Model<User> {
  @Column({primaryKey: true, autoIncrement: true, type: DataType.INTEGER, allowNull: false})
  id: number;

  @Column({type: DataType.STRING, allowNull: false})
  fullName: string;

  @Column({type: DataType.STRING, allowNull: false, unique: true})
  username: string;

  @Column({type: DataType.STRING, allowNull: false})
  password: string;

  @Column({type: DataType.ENUM, values: Object.values(Role), allowNull: false})
  role: Role; // admin, employee

  @Column({type: DataType.STRING, allowNull: true})
  image: string; // image url

  // @HasMany(() => Project)
  projects: string[] // should be Project[]

  // @ForeignKey(() => Department)
  departmentId: number;

  @CreatedAt
  createdAt: Date;

  @Column({type: DataType.INTEGER, allowNull: true})
  createdBy: number;

  @UpdatedAt
  updatedAt: Date;

  @Column({type: DataType.INTEGER, allowNull: true})
  updatedBy: number;

  @DeletedAt
  deletedAt: Date;
}