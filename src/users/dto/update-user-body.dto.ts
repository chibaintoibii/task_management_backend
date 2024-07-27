import {Role} from "../../auth/roles/role.enum";

export class UpdateUserBodyDto {
  username: string;
  password: string;
  fullName: string;
  phone?: string;
  role: Role;
  departmentId?: number;
}