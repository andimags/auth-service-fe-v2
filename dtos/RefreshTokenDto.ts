export interface RefreshTokenDto {
    id: number;
    user_id: number;
    jti: string;
    expires_at: Date;
    created_at: Date;
}

export interface CreateRefreshTokenDto {
    user_id: number;
    jti: string;
    expires_at: Date;
}

export interface UpdateRefreshTokenDto {
    expires_at?: Date;
}
