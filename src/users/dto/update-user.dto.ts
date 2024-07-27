import {Role} from "../../auth/roles/role.enum";

export class UpdateUserDto {
  id: number;
  username: string;
  password: string;
  fullName: string;
  phone?: string;
  role: Role;
  departmentId?: number;
  createdBy?: number
}