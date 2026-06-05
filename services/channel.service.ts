import { ChannelDto, CreateChannelDto, UpdateChannelDto } from "@/dtos"
import { getAuthServiceBaseUrl } from "@/lib/api"
import http from "./http/fetcher"

const AUTH_SERVICE_BASE_URL = getAuthServiceBaseUrl()

type GetChannelsParams = {
    accessToken: string
    apiKey: string
    search: string
}

export async function getChannels({
    accessToken,
    apiKey,
    search
}: GetChannelsParams): Promise<ChannelDto> {
    return http<ChannelDto>(`${AUTH_SERVICE_BASE_URL}/api/channels/${search}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "x-api-key": apiKey,
            "Content-Type": "application/json",
        },
        cache: "no-store",
    })
}

type GetChannelParams = {
    channelId: string
    accessToken: string
    apiKey: string
}

export async function getChannel({
    channelId,
    accessToken,
    apiKey,
}: GetChannelParams): Promise<ChannelDto> {
    return http<ChannelDto>(`${AUTH_SERVICE_BASE_URL}/api/channels/${channelId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "x-api-key": apiKey,
            "Content-Type": "application/json",
        },
        cache: "no-store",
    })
}

type CreateChannelParams = {
    payload: CreateChannelDto
    accessToken: string
    apiKey: string
}

export async function createChannel({
    payload,
    accessToken,
    apiKey,
}: CreateChannelParams): Promise<ChannelDto> {
    return http<ChannelDto>(`${AUTH_SERVICE_BASE_URL}/api/channels`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "x-api-key": apiKey,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })
}

type UpdateChannelParams = {
    channelId: string
    payload: UpdateChannelDto
    accessToken: string
    apiKey: string
}

export async function updateChannel({
    channelId,
    payload,
    accessToken,
    apiKey,
}: UpdateChannelParams): Promise<ChannelDto> {
    return http<ChannelDto>(`${AUTH_SERVICE_BASE_URL}/api/channels/${channelId}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "x-api-key": apiKey,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })
}

type DeleteChannelParams = {
    channelId: string
    accessToken: string
    apiKey: string
}

export async function deleteChannel({
    channelId,
    accessToken,
    apiKey,
}: DeleteChannelParams): Promise<{ message: string }> {
    return http<{ message: string }>(`${AUTH_SERVICE_BASE_URL}/api/channels/${channelId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "x-api-key": apiKey,
            "Content-Type": "application/json",
        },
    })
}
