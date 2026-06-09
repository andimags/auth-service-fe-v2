import http from "./http/fetcher"
import { getAuthServiceBaseUrl } from "@/lib/api"
import { UserRolesDto } from "@/dtos"
import { ReplaceUserRolesDto } from "@/dtos/UserRoleDto"

const AUTH_SERVICE_BASE_URL = getAuthServiceBaseUrl()

type GetUserRolesParams = {
    userId: number
    accessToken: string
    apiKey: string
}

export async function getUserRoles({
    userId,
    accessToken,
    apiKey,
}: GetUserRolesParams): Promise<UserRolesDto[]> {
    return http<UserRolesDto[]>(
        `${AUTH_SERVICE_BASE_URL}/api/user-role/user/${userId.toString()}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "x-api-key": apiKey,
                "Content-Type": "application/json",
            },
            cache: "no-store",
        }
    )
}

type ReplaceUserRolesParams = {
    userId: string
    payload: ReplaceUserRolesDto
    accessToken: string
    apiKey: string
}

export async function replaceUserRoles({
    userId,
    payload,
    accessToken,
    apiKey,
}: ReplaceUserRolesParams): Promise<UserRolesDto[]> {
    return http<UserRolesDto[]>(
        `${AUTH_SERVICE_BASE_URL}/api/user-role/user/${userId.toString()}`,
        {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "x-api-key": apiKey,
                "Content-Type": "application/json",
            },
            cache: "no-store",
            body: JSON.stringify(payload),
        }
    )
}
