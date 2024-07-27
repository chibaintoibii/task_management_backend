import {IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Length} from "class-validator";
import {Role} from "../../auth/roles/role.enum";

export class CreateUserBodyDto {
  @IsString()
  @IsNotEmpty()
  @Length(5, 100)
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 100)
  password: string;

  @IsString()
  @IsNotEmpty()
  @Length(5, 100)
  fullName: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsEnum(Role)
  role: Role;

  @IsNumber()
  @IsOptional()
  departmentId?: number;

  @IsNumber()
  @IsOptional()
  createdBy?: number
}