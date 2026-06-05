import { ReplaceRolePoliciesDto, RolePolicyDto } from "@/dtos/RolePolicyDto"
import { getAuthServiceBaseUrl } from "@/lib/api"
import http from "./http/fetcher"

const AUTH_SERVICE_BASE_URL = getAuthServiceBaseUrl()

type GetRolePoliciesParams = {
    roleId: number | string
    accessToken: string
    apiKey: string
}

export async function getRolePolicies({
    roleId,
    accessToken,
    apiKey,
}: GetRolePoliciesParams): Promise<RolePolicyDto[]> {
    return http<RolePolicyDto[]>(
        `${AUTH_SERVICE_BASE_URL}/api/role-policy/role/${roleId.toString()}`,
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

type ReplaceRolePoliciesParams = {
    roleId: number | string
    payload: ReplaceRolePoliciesDto
    accessToken: string
    apiKey: string
}

export async function replaceRolePolicies({
    roleId,
    payload,
    accessToken,
    apiKey,
}: ReplaceRolePoliciesParams): Promise<RolePolicyDto[]> {
    return http<RolePolicyDto[]>(
        `${AUTH_SERVICE_BASE_URL}/api/role-policy/role/${roleId.toString()}`,
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
