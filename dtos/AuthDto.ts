import { UserDto } from "./UserDto"

export interface AuthResponseDto {
    user: UserDto

    tokens: {
        access: {
            value: string
            expires_at: number
        }

        refresh: {
            value: string
            expires_at: number
        }
    }
}

export interface DestroyTokenResponseDto{
    message: string,
    deleted_refresh_token_rows: number
}