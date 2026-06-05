import { PolicyDto } from "./PolicyDto"

export interface RolePolicyRelationDto {
    policy_id: number
    role_id: number
    created_at: Date
}

export interface RolePolicyDto extends PolicyDto {
    RolePolicy: RolePolicyRelationDto
}

export interface ReplaceRolePoliciesDto {
    policy_ids: Array<string | number>
}
