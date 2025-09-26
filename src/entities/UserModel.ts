import {RoleModel} from "entities/RoleModel";

export type UserModel = {
    id: number | null;
    username: string;
    email: string;
    password: string;
    role: RoleModel;
    createdAt: number;
    updatedAt: number;
}
