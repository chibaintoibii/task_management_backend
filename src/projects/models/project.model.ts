import {
  BelongsToMany,
  Column,
  CreatedAt,
  DataType, ForeignKey, Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import {User} from "../../users/models/user.model";
import {ProjectMember} from "./project-member.model";

@Table({
  timestamps: true,
  tableName: 'projects',
})
export class Project extends Model<Project> {
  @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
  id: number;

  @Column({type: DataType.STRING, allowNull: false})
  name: string;

  @Column({type: DataType.TEXT, allowNull: true})
  description: string

  @Column({type: DataType.INTEGER, allowNull: false})
  departmentId: number;

  @CreatedAt
  createdAt: Date;

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER, allowNull: true})
  createdBy: number;

  @UpdatedAt
  updatedAt: Date;

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER, allowNull: true})
  updatedBy: number;

  @Column({type: DataType.BOOLEAN, defaultValue: false})
  isDeleted: boolean;

  @BelongsToMany(() => User, () => ProjectMember)
  members: User[]
}
