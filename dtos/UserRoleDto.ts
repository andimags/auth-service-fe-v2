import { RoleDto } from "./RoleDto"

export interface UserRole {
    user_id: number
    role_id: number
    create_at: string
}

export interface UserRolesDto extends RoleDto {
    UserRole: UserRole
}

export interface ReplaceUserRolesDto {
    role_ids: number[]
}
