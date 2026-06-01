import { UserDto } from "@/dtos"

interface Tokens {
    access: {
        value: string
        expires_at: number
    }
    refresh: {
        value: string
        expires_at: number
    }
}

declare module "next-auth" {
    interface User {
        user: UserDto
        tokens: Tokens
        api_key: string
    }

    interface Session {
        user: UserDto
        api_key: string
        access_token: string,
        error: any
    }
}

import "next-auth/jwt"

declare module "next-auth/jwt" {
    interface JWT {
        user: UserDto
        tokens: Tokens
        api_key: string
    }
}
