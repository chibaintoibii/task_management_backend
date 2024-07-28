import {
  BelongsTo, BelongsToMany,
  Column,
  CreatedAt,
  DataType,
  ForeignKey, HasMany,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import {Department} from 'src/departments/models/department.model';
import {Project} from "../../projects/models/project.model";
import {ProjectMember} from "../../projects/models/project-member.model";
import {Role} from "../../auth/roles/role.enum";
import {Task} from "../../tasks/models/task.model";

@Table({tableName: 'users', timestamps: true})
export class User extends Model<User> {
  @Column({primaryKey: true, autoIncrement: true, type: DataType.INTEGER, allowNull: false,})
  id: number;

  @Column({type: DataType.STRING, allowNull: false, field: 'full_name'})
  fullName: string;

  @Column({type: DataType.STRING, allowNull: false, unique: true})
  username: string;

  @Column({type: DataType.STRING, allowNull: false})
  password: string;

  @Column({type: DataType.STRING, allowNull: true})
  phone: string;

  @Column
  position?: string // manager, master, employee, security

  @Column({type: DataType.ENUM, values: Object.values(Role), allowNull: false,})
  role: Role; // admin, employee, ...

  @Column({type: DataType.STRING, allowNull: true})
  image: string; // image url

  @ForeignKey(() => Department)
  @Column({
    type: DataType.INTEGER,
    allowNull: true, // Making the foreign key optional,
    field: 'department_id'
  })
  departmentId?: number;

  @BelongsTo(() => Department)
  department: Department;

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

  @BelongsToMany(() => Project, () => ProjectMember)
  projects: Project[];

  @HasMany(() => Task)
  tasks: Task[]
}
