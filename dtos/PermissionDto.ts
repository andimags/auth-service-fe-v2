export interface PermissionDto {
    id: number
    name: string
    description?: string | null
    ref_name: string
    module: string
    access_level: string
    is_system: boolean
    created_at: Date
    updated_at: Date
    deleted_at?: Date | null
}

export interface CreatePermissionDto {
    name: string
    description?: string | null
    ref_name: string
    module: string
    access_level: string
    is_system?: boolean
}

export interface UpdatePermissionDto {
    name?: string
    description?: string | null
    module?: string
    access_level?: string
    is_system?: boolean
}
