import {IsInt, IsPositive} from "class-validator";
import {Type} from "class-transformer";

export class PathIdDto {
  @Type(() => Number)
  @IsInt() // Validates that the id is an integer
  @IsPositive()
  id: number
}