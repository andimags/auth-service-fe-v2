import { UserDto, CreateUserDto } from "@/dtos"
import http from "./http/fetcher"

type GetUserParams = {
    userId: string
    accessToken: string
    apiKey: string
}

const AUTH_SERVICE_BASE_URL = process.env.AUTH_SERVICE_BASE_URL

if (!AUTH_SERVICE_BASE_URL) {
    throw new Error("AUTH_SERVICE_BASE_URL value is undefined")
}

export async function getUser({
    userId,
    accessToken,
    apiKey,
}: GetUserParams): Promise<UserDto> {
    return http<UserDto>(`${AUTH_SERVICE_BASE_URL}/api/users/${userId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "x-api-key": apiKey,
            "Content-Type": "application/json",
        },
        cache: "no-store",
    })
}

type AddUserParams = {
    payload: CreateUserDto
    accessToken: string
    apiKey: string
}

export async function addUser({
    payload,
    accessToken,
    apiKey,
}: AddUserParams): Promise<UserDto> {
    return http<UserDto>(`${AUTH_SERVICE_BASE_URL}/api/users`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "x-api-key": apiKey,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    })
}
