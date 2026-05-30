export default async function http<T>(
    url: string,
    options?: RequestInit
): Promise<T> {
    const res = await fetch(url, options)

    const text = await res.text()

    if (!res.ok) {
        throw new Error(text || `Request failed: ${res.status}`)
    }

    return JSON.parse(text) as T
}