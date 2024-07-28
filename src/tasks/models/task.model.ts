import {Column, CreatedAt, DataType, ForeignKey, Model, Table, UpdatedAt} from "sequelize-typescript";
import {TaskStatus} from "../types/task-status.enum";
import {Project} from "../../projects/models/project.model";
import {User} from "../../users/models/user.model";

@Table({timestamps: true, tableName: 'tasks'})
export class Task extends Model<Task> {
  @Column({primaryKey: true, autoIncrement: true, type: DataType.INTEGER, allowNull: false,})
  id: number;

  @Column({type: DataType.STRING, allowNull: false})
  name: string;

  @Column({type: DataType.TEXT, allowNull: true})
  description: string;

  @ForeignKey(() => Project)
  @Column({type: DataType.INTEGER, allowNull: false, field: 'project_id'})
  projectId: number;

  @Column({type: DataType.INTEGER, allowNull: false})
  author: number;

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER, allowNull: false})
  executor: number;

  @Column({type: DataType.STRING, allowNull: false, field: 'start_time'})
  startTime: string;

  @Column({type: DataType.STRING, allowNull: false, field: 'end_time'})
  endTime: string;

  @Column({type: DataType.ENUM, values: Object.values(TaskStatus), allowNull: false, defaultValue: TaskStatus.NEW})
  status: TaskStatus;

  @Column({type: DataType.INTEGER, defaultValue: 0}) // from 0 to 10
  complexity: number;

  @Column({type: DataType.ARRAY(DataType.STRING), defaultValue: [], field: 'attached_files'})
  attachedFiles: string[]

  @Column({type: DataType.INTEGER, field: 'execute_time'})
  executeTime: number

  @Column({type: DataType.INTEGER, field: 'time_spent'})
  timeSpent: number

  @CreatedAt
  @Column({field: 'created_at'})
  createdAt: Date;

  @Column({type: DataType.INTEGER, allowNull: true, field: 'created_by'})
  createdBy: number

  @UpdatedAt
  @Column({type: DataType.INTEGER, allowNull: true, field: 'updated_by'})
  updatedAt: Date;

  @Column({type: DataType.INTEGER, allowNull: true, field: 'updated_by'})
  updatedBy: number;

  @Column({type: DataType.BOOLEAN, defaultValue: false, field: 'is_deleted'})
  isDeleted: boolean;
}
