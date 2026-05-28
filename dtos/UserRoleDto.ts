export interface UserRoleDto {
    user_id: number;
    role_id: number;
    created_at: Date;
}

export interface CreateUserRoleDto {
    user_id: number;
    role_id: number;
}
