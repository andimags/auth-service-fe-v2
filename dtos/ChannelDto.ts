export interface ChannelDto {
    id: number
    name: string
    description?: string | null
    ref_name: string
    api_key: string
    created_at: Date
    updated_at: Date
    deleted_at?: Date | null
}

export interface CreateChannelDto {
    name: string
    description?: string | null
    ref_name: string
}

export interface UpdateChannelDto {
    name: string
    description?: string | null
    ref_name: string
}
