import {Role} from "../roles/role.enum";

export interface JwtUserPayload {
  id: number;
  username: string;
  role: Role;
}