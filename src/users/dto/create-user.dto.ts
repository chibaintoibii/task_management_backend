import {Role} from "../../auth/roles/role.enum";

export class CreateUserDto {
  username: string;
  password: string;
  fullName: string;
  phone?: string;
  role: Role;
  departmentId?: number;
  createdBy?: number
}