import { PermissionDto } from "./PermissionDto"

export interface PolicyPermissionRelationDto {
    policy_id: number
    permission_id: number
    created_at: Date
}

export interface PolicyPermissionDto extends PermissionDto {
    PolicyPermission: PolicyPermissionRelationDto
}

export interface ReplacePolicyPermissionsDto {
    permission_ids: Array<string | number>
}
