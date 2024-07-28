import {Column, CreatedAt, DataType, ForeignKey, Model, Table, UpdatedAt} from "sequelize-typescript";
import {TaskStatus} from "../types/task-status.enum";
import {Project} from "../../projects/models/project.model";
import {User} from "../../users/models/user.model";

@Table({timestamps: true})
export class Task extends Model<Task> {
  @Column({primaryKey: true, autoIncrement: true, type: DataType.INTEGER, allowNull: false,})
  id: number;

  @Column({type: DataType.STRING, allowNull: false})
  name: string;

  @Column({type: DataType.TEXT, allowNull: true})
  description: string;

  @ForeignKey(() => Project)
  @Column({type: DataType.INTEGER, allowNull: false})
  projectId: number;

  @Column({type: DataType.INTEGER, allowNull: false})
  author: number;

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER, allowNull: false})
  executor: number;

  @Column({type: DataType.STRING, allowNull: false})
  startTime: string;

  @Column({type: DataType.STRING, allowNull: false})
  endTime: string;

  @Column({type: DataType.ENUM, values: Object.values(TaskStatus), allowNull: false})
  status: TaskStatus;

  @Column({type: DataType.INTEGER, defaultValue: 0}) // from 0 to 10
  complexity: number;

  @Column({type: DataType.ARRAY(DataType.STRING), defaultValue: []})
  attachedFiles: string[]

  @Column({type: DataType.INTEGER})
  executeTime: number

  @Column({type: DataType.INTEGER})
  timeSpent: number

  @CreatedAt
  createdAt: Date;

  @Column({type: DataType.INTEGER, allowNull: true})
  createdBy: number;

  @UpdatedAt
  updatedAt: Date;

  @Column({type: DataType.INTEGER, allowNull: true})
  updatedBy: number;

  @Column({type: DataType.BOOLEAN, defaultValue: false})
  isDeleted: boolean;
}
