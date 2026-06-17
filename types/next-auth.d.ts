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
        permissions: string[]
        tokens: Tokens
        api_key: string
    }

    interface Session {
        user: UserDto
        permissions: string[]
        api_key: string
        access_token: string
        error: string
    }
}

import "next-auth/jwt"

declare module "next-auth/jwt" {
    interface JWT {
        user: UserDto
        permissions: string[]
        tokens: Tokens
        api_key: string
    }
}
