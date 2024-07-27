import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../../users/models/user.model";
import {Project} from "./project.model";

@Table({tableName: 'project_members'})
export class ProjectMember extends Model {
  @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
  id: number;

  @ForeignKey(() => Project)
  @Column({field: 'project_id'})
  projectId: number;

  @ForeignKey(() => User)
  @Column({field: 'user_id'})
  userId: number
}
