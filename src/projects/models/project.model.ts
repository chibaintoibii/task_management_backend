import {BelongsToMany, Column, CreatedAt, DataType, Model, Table, UpdatedAt,} from 'sequelize-typescript';
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

  @Column({type: DataType.TEXT})
  description: string

  @CreatedAt
  @Column({field: 'created_at'})
  createdAt: Date;

  @Column({type: DataType.INTEGER, field: 'created_by'})
  createdBy: number

  @UpdatedAt
  @Column({type: DataType.INTEGER, field: 'updated_at'})
  updatedAt: Date;

  @Column({type: DataType.INTEGER, field: 'updated_by'})
  updatedBy: number;

  @Column({type: DataType.BOOLEAN, defaultValue: false, field: 'is_deleted'})
  isDeleted: boolean;

  @BelongsToMany(() => User, () => ProjectMember)
  members: User[]
}
