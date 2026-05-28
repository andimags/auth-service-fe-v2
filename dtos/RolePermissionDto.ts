export interface RolePermissionDto {
    role_id: number;
    permission_id: number;
    created_at: Date;
}

export interface CreateRolePermissionDto {
    role_id: number;
    permission_id: number;
}
