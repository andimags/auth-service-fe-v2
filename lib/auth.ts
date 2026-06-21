export function redirectToLogin() {
    const currentPath = globalThis.location.pathname + globalThis.location.search
    globalThis.location.href = `/login?redirect=${encodeURIComponent(currentPath)}`
}