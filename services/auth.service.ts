import { AuthResponseDto } from "@/dtos/AuthDto"
import http from "./http/fetcher"

type LoginParams = {
    email: string
    password: string
    apiKey: string
}

const AUTH_SERVICE_BASE_URL = process.env.AUTH_SERVICE_BASE_URL

if (!AUTH_SERVICE_BASE_URL) {
    throw new Error("AUTH_SERVICE_BASE_URL value is undefined")
}

export async function loginWithCredentials({
    email,
    password,
    apiKey,
}: LoginParams): Promise<AuthResponseDto> {
    return http<AuthResponseDto>(
        `${AUTH_SERVICE_BASE_URL}/api/auth/generate-token`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": apiKey,
            },
            body: JSON.stringify({ email, password }),
        }
    )
}

export async function refreshAccessToken(
    refreshToken: string
): Promise<AuthResponseDto> {
    return http<AuthResponseDto>(`${AUTH_SERVICE_BASE_URL}/api/auth/refresh-token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
    })
}
