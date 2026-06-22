import { ApiError } from "@/lib/api-error"

export default async function http<T>(
    url: string,
    options?: RequestInit
): Promise<T> {
    const res = await fetch(url, options)
    const text = await res.text()

    let body: any
    
    try {
        body = text ? JSON.parse(text) : undefined
    } catch {
        body = undefined // backend (or a proxy in front of it) returned non-JSON
    }

    if (!res.ok) {
        const message = body?.message ?? text ?? `Request failed: ${res.status}`
        throw new ApiError(message, res.status, body?.details)
    }

    return body as T
}

export function isForbiddenError(error: unknown): boolean {
    if(error instanceof ApiError){
        return error.statusCode === 403
    }

    return false
}
