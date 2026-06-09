import { withAuth } from "next-auth/middleware"

export default withAuth({
    pages: { signIn: "/login" },
    callbacks: {
        authorized: ({ token }) => {
            if (!token) return false
            if (token.error) return false
            if (!token.tokens?.access?.value) return false
            if (!token.api_key) return false
            return true
        },
    },
})

export const config = {
    matcher: [
        "/((?!login|register|api/auth|_next/static|_next/image|favicon.ico).*)",
    ],
}
