/**
 * Returns the base URL for internal API calls.
 * Centralizes the environment variable resolution logic previously
 * duplicated across UserFormDialog, UsersDataTable, and UserInformation.
 */
export function getBaseUrl(): string {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

    if (!BASE_URL) {
        throw new Error(
            "Base URL is not defined. Please set NEXT_PUBLIC_BASE_URL environment variable."
        )
    }

    return BASE_URL
}

export function getAuthServiceBaseUrl(): string {
    const AUTH_SERVICE_BASE_URL = process.env.AUTH_SERVICE_BASE_URL

    if (!AUTH_SERVICE_BASE_URL) {
        throw new Error(
            "Auth Service Base URL is not defined. Please set AUTH_SERVICE_BASE_URL environment variable."
        )
    }

    return AUTH_SERVICE_BASE_URL
}
