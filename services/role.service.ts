import { CreateRoleDto, RoleDto, UpdateRoleDto } from "@/dtos"
import { getAuthServiceBaseUrl } from "@/lib/api"
import http from "./http/fetcher"

const AUTH_SERVICE_BASE_URL = getAuthServiceBaseUrl()

type GetRolesParams = {
    search: string
    accessToken: string
    apiKey: string
}

export async function getRoles({
    search,
    accessToken,
    apiKey,
}: GetRolesParams): Promise<RoleDto> {
    return http<RoleDto>(`${AUTH_SERVICE_BASE_URL}/api/roles/${search}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "x-api-key": apiKey,
            "Content-Type": "application/json",
        },
        cache: "no-store",
    })
}

type GetRoleParams = {
    roleId: string
    accessToken: string
    apiKey: string
}

export async function getRole({
    roleId,
    accessToken,
    apiKey,
}: GetRoleParams): Promise<RoleDto> {
    return http<RoleDto>(`${AUTH_SERVICE_BASE_URL}/api/roles/${roleId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "x-api-key": apiKey,
            "Content-Type": "application/json",
        },
        cache: "no-store",
    })
}

type AddRoleParams = {
    payload: CreateRoleDto
    accessToken: string
    apiKey: string
}

export async function addRole({
    payload,
    accessToken,
    apiKey,
}: AddRoleParams): Promise<RoleDto> {
    return http<RoleDto>(`${AUTH_SERVICE_BASE_URL}/api/roles`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "x-api-key": apiKey,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })
}

type UpdateRoleParams = {
    roleId: string
    payload: UpdateRoleDto
    accessToken: string
    apiKey: string
}

export async function updateRole({
    roleId,
    payload,
    accessToken,
    apiKey,
}: UpdateRoleParams): Promise<RoleDto> {
    return http<RoleDto>(`${AUTH_SERVICE_BASE_URL}/api/roles/${roleId}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "x-api-key": apiKey,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })
}

type DeleteRoleParams = {
    roleId: string
    accessToken: string
    apiKey: string
}

export async function deleteRole({
    roleId,
    accessToken,
    apiKey,
}: DeleteRoleParams): Promise<{ message: string }> {
    return http<{ message: string }>(`${AUTH_SERVICE_BASE_URL}/api/roles/${roleId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "x-api-key": apiKey,
            "Content-Type": "application/json",
        },
    })
}
