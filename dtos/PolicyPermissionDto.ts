export interface PolicyPermissionDto {
    policy_id: number
    permission_id: number
    created_at: Date
}

export interface CreatePolicyPermissionDto {
    policy_id: number
    permission_id: number
}
