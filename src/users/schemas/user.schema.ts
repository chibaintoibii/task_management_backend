import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Role} from "../../auth/roles/role.enum";
import {Document, Types} from "mongoose";

export type UserDocument = User & Document

@Schema({timestamps: true})
export class User {
  @Prop({type: String, required: true})
  fullName: string;

  @Prop({type: String, required: true, unique: true})
  username: string;

  @Prop({type: String, required: true})
  password: string;

  @Prop({type: String})
  phone: string;

  @Prop({type: String})
  position?: string

  @Prop({type: String, default: Role.EMPLOYEE})
  role: Role;

  @Prop({type: String})
  image?: string; // image url

  @Prop({type: Types.ObjectId, ref: 'Department'})
  department?: Types.ObjectId;

  @Prop({
    default: [],
    type: [Types.ObjectId],
    ref: 'Project'
  })
  projects: Types.ObjectId[]

  @Prop({type: Types.ObjectId, ref: 'User'})
  createdBy: Types.ObjectId;

  @Prop({type: Types.ObjectId, ref: 'User', default: null})
  updatedBy: Types.ObjectId;

  @Prop({type: Boolean, default: false})
  isDeleted: boolean
}

export const UserSchema = SchemaFactory.createForClass(User);
