import { type NextAuthOptions } from "next-auth"
import type { JWT } from "next-auth/jwt"
import CredentialsProvider from "next-auth/providers/credentials"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? process.env.NEXTAUTH_URL ?? "http://localhost:3000"
const BACKEND_URL = `${BASE_URL}/backend/api/auth`
const LOGIN_URL = `${BACKEND_URL}/generate-token`
const REFRESH_URL = `${BACKEND_URL}/refresh-token`

type AuthToken = JWT & {
  accessToken?: string
  refreshToken?: string
  accessTokenExpires?: number
  error?: string
  user?: unknown
}

type AuthResponse = {
  user: unknown
  tokens: {
    access: {
      value: string
      expires_at: number
    }
    refresh: {
      value: string
      expires_at: number
    }
  }
}

async function refreshAccessToken(token: AuthToken): Promise<AuthToken> {
  if (!token.refreshToken) {
    return { ...token, error: "RefreshTokenMissing" }
  }

  try {
    const response = await fetch(REFRESH_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: token.refreshToken }),
    })

    const data = (await response.json()) as AuthResponse

    if (!response.ok || !data?.tokens?.access?.value) {
      return { ...token, error: "RefreshAccessTokenError" }
    }

    return {
      ...token,
      accessToken: data.tokens.access.value,
      refreshToken: data.tokens.refresh.value,
      accessTokenExpires: data.tokens.access.expires_at,
      user: data.user ?? token.user,
      error: undefined,
    }
  } catch (error) {
    return { ...token, error: "RefreshAccessTokenError" }
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        api_key: { label: "API Key", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const response = await fetch(LOGIN_URL, {
          method: "POST",
          headers: {
  "Content-Type": "application/json",
  "x-api-key": credentials.api_key
},
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password
          }),
        })

        const data = (await response.json()) as AuthResponse

        if (!response.ok || !data?.tokens?.access?.value || !data?.user) {
          return null
        }

        return {
          id: String((data.user as any)?.id ?? ""),
          name: (data.user as any)?.username ?? (data.user as any)?.email,
          email: (data.user as any)?.email,
          user: data.user,
          accessToken: data.tokens.access.value,
          refreshToken: data.tokens.refresh.value,
          accessTokenExpires: data.tokens.access.expires_at,
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      const authToken = token as AuthToken

      if (user) {
        return {
          ...authToken,
          accessToken: (user as any).accessToken,
          refreshToken: (user as any).refreshToken,
          accessTokenExpires: (user as any).accessTokenExpires,
          user: (user as any).user ?? user,
          error: undefined,
        }
      }

      if (authToken.accessTokenExpires && Date.now() < authToken.accessTokenExpires) {
        return authToken
      }

      return refreshAccessToken(authToken)
    },
    async session({ session, token }) {
      const authToken = token as AuthToken

      if (authToken.user) {
        session.user = {
          ...session.user,
          ...(authToken.user as any),
          accessToken: authToken.accessToken,
          refreshToken: authToken.refreshToken,
          roles: (authToken.user as any)?.roles ?? [],
        }
      }

      ;(session as any).error = authToken.error
      return session
    },
  },
  debug: process.env.NODE_ENV === "development",
}
