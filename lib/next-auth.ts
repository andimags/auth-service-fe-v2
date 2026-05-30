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

        return {
            ...token,
            ...data,
            api_key: token.api_key,
            tokens: data.tokens
        }
    } catch {
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
        maxAge: 60 * 60,
        updateAge: 15 * 60,
    },
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async jwt(params) {
            const { token, user } = params

            if (user?.tokens) {
                return {
                    ...token,
                    user: user.user ?? token.user,
                    tokens: user.tokens ?? token.tokens,
                    api_key: user.api_key ?? token.api_key
                }
            }

            const accessTokenExpires = normalizeExpiresAt(token.tokens?.access?.expires_at)

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
            session.user = token.user
            session.api_key = token.api_key
            session.access_token = token.tokens?.access?.value ?? ""

            return session
        },
    },
    debug: process.env.NODE_ENV === "development",
}
