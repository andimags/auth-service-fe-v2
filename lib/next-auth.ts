import {
    loginWithCredentials,
    refreshAccessToken as refreshTokenRequest,
} from "@/services/auth.service"
import { type NextAuthOptions } from "next-auth"
import { type JWT } from "next-auth/jwt"
import CredentialsProvider from "next-auth/providers/credentials"

const REFRESH_BUFFER_MS = 30_000

function normalizeExpiresAt(expiresAt?: number): number {
    if (!expiresAt) {
        return Date.now()
    }

    return expiresAt < 1_000_000_000_000 ? expiresAt * 1000 : expiresAt
}

async function refreshAccessToken(token: JWT): Promise<JWT> {
    if (!token.tokens?.refresh?.value) {
        return { ...token, error: "MissingRefreshToken" }
    }

    try {
        const data = await refreshTokenRequest(token.tokens.refresh.value)

        const normalizedTokens = {
            access: {
                value: data.tokens.access.value,
                expires_at: normalizeExpiresAt(data.tokens.access.expires_at),
            },
            refresh: {
                value: data.tokens.refresh.value,
                expires_at: normalizeExpiresAt(data.tokens.refresh.expires_at),
            },
        }

        return {
            ...token,
            user: data.user ?? token.user,
            api_key: token.api_key,
            tokens: normalizedTokens,
        }
    } catch (error){
        console.log(error)
        return { ...token, error: "RefreshAccessTokenError" }
    }
}

const credentialsProvider = CredentialsProvider({
    id: "credentials",
    name: "Credentials",
    credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        api_key: { label: "API Key", type: "password" },
    },
    async authorize(
        credentials:
            | Record<"email" | "password" | "api_key", string>
            | undefined
    ) {
        if (!credentials?.email || !credentials?.password) {
            return null
        }

        try {
            const data = await loginWithCredentials({
                email: credentials.email,
                password: credentials.password,
                apiKey: credentials.api_key,
            })

            if (!data?.tokens?.access?.value || !data?.user) {
                return null
            }

            return {
                id: String(data.user.id),
                name: `${data.user.first_name} ${data.user.last_name}`,
                email: data.user.email,
                ...data,
                api_key: credentials.api_key,
            }
        } catch {
            return null
        }
    },
})

export const authOptions: NextAuthOptions = {
    providers: [credentialsProvider],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24,
        // updateAge: 15 * 60, 15 mins
        updateAge: 60
    },
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async jwt(params) {
            const { token, user } = params

            if (user?.tokens) {
                const normalizedUserTokens = {
                    access: {
                        value: user.tokens.access.value,
                        expires_at: normalizeExpiresAt(user.tokens.access.expires_at),
                    },
                    refresh: {
                        value: user.tokens.refresh.value,
                        expires_at: normalizeExpiresAt(user.tokens.refresh.expires_at),
                    },
                }

                return {
                    ...token,
                    user: user.user ?? token.user,
                    tokens: normalizedUserTokens,
                    api_key: user.api_key ?? token.api_key,
                }
            }

            // Ensure tokens exist before checking expiration
            if (!token.tokens?.access?.expires_at) {
                return { ...token, error: "MissingTokenData" }
            }

            const accessTokenExpires = normalizeExpiresAt(token.tokens.access.expires_at)

            if (
                accessTokenExpires &&
                Date.now() < accessTokenExpires - REFRESH_BUFFER_MS
            ) {
                return token
            }

            return refreshAccessToken(token)
        },
        async session({ session, token }) {
            console.log('session callback called')
            
            if (token.error) {
                console.log('Token refresh error:', token.error)
            }
            
            session.user = token.user
            session.api_key = token.api_key
            session.access_token = token.tokens?.access?.value ?? ""

            return session
        },
        redirect({ url, baseUrl }) {
            // Always redirect to login on auth errors
            if (url.includes("error=")) {
                return `${baseUrl}/login`
            }
            // Default behavior
            if (url.startsWith("/")) return `${baseUrl}${url}`
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        },
    },
    debug: process.env.NODE_ENV === "development",
}
