import { RoleDto } from "@/dtos"
import http from "./http/fetcher"
import { getAuthServiceBaseUrl } from "@/lib/api"

const AUTH_SERVICE_BASE_URL = getAuthServiceBaseUrl()

type GetRolesParams = {
    search?: string
    accessToken: string
    apiKey: string
}

export async function getRoles({
    search,
    accessToken,
    apiKey,
}: GetRolesParams): Promise<RoleDto[]> {
    return http<RoleDto[]>(`${AUTH_SERVICE_BASE_URL}/api/roles?${search}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "x-api-key": apiKey,
            "Content-Type": "application/json",
        },
        cache: "no-store",
    })
}
