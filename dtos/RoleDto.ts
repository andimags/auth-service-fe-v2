export interface RoleDto {
    id: number
    name: string
    description?: string | null
    ref_name: string
    channel_id: number | null
    scope: string
    created_at: Date
    updated_at: Date
    deleted_at?: Date | null
}

export interface CreateRoleDto {
    name: string
    description?: string | null
    ref_name: string
    channel_id?: number | null
    scope: string
}

export interface UpdateRoleDto {
    name?: string
    description?: string | null
    ref_name?: string
    channel_id?: number | null
    scope?: string
}
