import { CreatePermissionDto, PermissionDto, UpdatePermissionDto } from "@/dtos"
import { getAuthServiceBaseUrl } from "@/lib/api"
import http from "./http/fetcher"

const AUTH_SERVICE_BASE_URL = getAuthServiceBaseUrl()

type GetPermissionsParams = {
    search?: string
    accessToken: string
    apiKey: string
}

export async function getPermissions({
    search = '',
    accessToken,
    apiKey,
}: GetPermissionsParams): Promise<PermissionDto[]> {
    return http<PermissionDto[]>(`${AUTH_SERVICE_BASE_URL}/api/permissions${search}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "x-api-key": apiKey,
            "Content-Type": "application/json",
        },
        cache: "no-store",
    })
}

type GetPermissionParams = {
    permissionId: string | number
    accessToken: string
    apiKey: string
}

export async function getPermission({
    permissionId,
    accessToken,
    apiKey,
}: GetPermissionParams): Promise<PermissionDto> {
    return http<PermissionDto>(`${AUTH_SERVICE_BASE_URL}/api/permissions/${permissionId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "x-api-key": apiKey,
            "Content-Type": "application/json",
        },
        cache: "no-store",
    })
}

type AddPermissionParams = {
    payload: CreatePermissionDto
    accessToken: string
    apiKey: string
}

export async function addPermission({
    payload,
    accessToken,
    apiKey,
}: AddPermissionParams): Promise<PermissionDto> {
    return http<PermissionDto>(`${AUTH_SERVICE_BASE_URL}/api/permissions`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "x-api-key": apiKey,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })
}

type UpdatePermissionParams = {
    permissionId: string | number
    payload: UpdatePermissionDto
    accessToken: string
    apiKey: string
}

export async function updatePermission({
    permissionId,
    payload,
    accessToken,
    apiKey,
}: UpdatePermissionParams): Promise<PermissionDto> {
    return http<PermissionDto>(`${AUTH_SERVICE_BASE_URL}/api/permissions/${permissionId}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "x-api-key": apiKey,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })
}

type DeletePermissionParams = {
    permissionId: string | number
    accessToken: string
    apiKey: string
}

export async function deletePermission({
    permissionId,
    accessToken,
    apiKey,
}: DeletePermissionParams): Promise<{ message: string }> {
    return http<{ message: string }>(`${AUTH_SERVICE_BASE_URL}/api/permissions/${permissionId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "x-api-key": apiKey,
            "Content-Type": "application/json",
        },
    })
}
