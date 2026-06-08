import { PermissionAccessLevelType, PermissionIsSystemType } from "@/constants/enums"

export interface PermissionDto {
    id: number
    name: string
    description?: string | null
    ref_name: string
    module: string
    access_level: PermissionAccessLevelType
    is_system: PermissionIsSystemType
    created_at: Date
    updated_at: Date
    deleted_at?: Date | null
}

export interface CreatePermissionDto {
    name: string
    description?: string | null
    ref_name: string
    module: string
    scope: string
    access_level: PermissionAccessLevelType
}

export interface UpdatePermissionDto {
    name?: string
    description?: string | null
    ref_name?: string
    module?: string
    scope?: string
    access_level?: PermissionAccessLevelType
}
