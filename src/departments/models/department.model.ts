import {
  Column,
  CreatedAt,
  DataType, ForeignKey,
  HasMany,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { User } from 'src/users/models/user.model';

@Table({ tableName: 'departments', timestamps: true })
export class Department extends Model<Department> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    allowNull: false,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.TEXT })
  description: string;

  @CreatedAt
  @Column({field: 'created_at'})
  createdAt: Date;

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER, field: 'created_by'})
  createdBy: number

  @UpdatedAt
  @Column({field: 'updated_at'})
  updatedAt: Date;

  @Column({type: DataType.INTEGER, field: 'updated_by'})
  updatedBy: number;

  @Column({type: DataType.BOOLEAN, defaultValue: false, field: 'is_deleted'})
  isDeleted: boolean;

  @HasMany(() => User)
  users: User[];
}
