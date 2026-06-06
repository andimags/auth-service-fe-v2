import { PolicyIsSystemType } from "@/constants/enums"

export interface PolicyDto {
    id: number
    name: string
    description?: string | null
    ref_name: string
    is_system: PolicyIsSystemType
    created_at: Date
    updated_at: Date
    deleted_at?: Date | null
}

export interface CreatePolicyDto {
    name: string
    description?: string | null
    ref_name: string
    is_system?: boolean
}

export interface UpdatePolicyDto {
    name?: string
    description?: string | null
    ref_name?: string
    is_system?: boolean
}
