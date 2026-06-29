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
        body = undefined
    }

    if (!res.ok) {
        throw new ApiError(
            body?.message ?? "Something went wrong",
            res.status,
            body?.errors,
        )
    }

    return body as T
}

export function isForbiddenError(error: unknown): boolean {
    if(error instanceof ApiError){
        return error.statusCode === 403
    }

    return false
}
