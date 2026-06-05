import { PolicyDto } from "@/dtos"
import { getAuthServiceBaseUrl } from "@/lib/api"
import http from "./http/fetcher"

const AUTH_SERVICE_BASE_URL = getAuthServiceBaseUrl()

type GetPoliciesParams = {
    accessToken: string
    apiKey: string
}

export async function getPolicies({
    accessToken,
    apiKey,
}: GetPoliciesParams): Promise<PolicyDto[]> {
    return http<PolicyDto[]>(`${AUTH_SERVICE_BASE_URL}/api/policies`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "x-api-key": apiKey,
            "Content-Type": "application/json",
        },
        cache: "no-store",
    })
}
