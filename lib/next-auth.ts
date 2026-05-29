import { AuthResponseDto } from "@/dtos/AuthDto"
import { type NextAuthOptions } from "next-auth"
import { type JWT } from "next-auth/jwt"
import CredentialsProvider from "next-auth/providers/credentials"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? process.env.NEXTAUTH_URL ?? "http://localhost:3000"
const BACKEND_URL = `${BASE_URL}/backend/api/auth`
const LOGIN_URL = `${BACKEND_URL}/generate-token`
const REFRESH_URL = `${BACKEND_URL}/refresh-token`
const REFRESH_BUFFER_MS = 30_000

type AuthToken = JWT & AuthResponseDto & {
  api_key?: string
  accessTokenExpires?: number
  error?: string
}

async function refreshAccessToken(token: AuthToken): Promise<AuthToken> {
  if (!token.tokens?.refresh?.value) {
    return { ...token, error: "MissingRefreshToken" }
  }

  try {
    const response = await fetch(REFRESH_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: token.tokens.refresh.value }),
    })

    const data = (await response.json()) as AuthResponseDto

    if (!response.ok || !data?.tokens?.access?.value) {
      return { ...token, error: "RefreshAccessTokenError" }
    }

    return {
      ...token,
      ...data,
      api_key: token.api_key,
      accessTokenExpires: data.tokens.access.expires_at,
    }
  } catch {
    return { ...token, error: "RefreshAccessTokenError" }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const credentialsProvider = CredentialsProvider({
  id: "credentials",
  name: "Credentials",
  credentials: {
    email: { label: "Email", type: "email" },
    password: { label: "Password", type: "password" },
    api_key: { label: "API Key", type: "password" },
  },
  async authorize(
    credentials: Record<"email" | "password" | "api_key", string> | undefined
  ): Promise<AuthToken | null> {
    if (!credentials?.email || !credentials?.password) {
      return null
    }

    const response = await fetch(LOGIN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": credentials.api_key,
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    })

    const data = (await response.json()) as AuthResponseDto

    if (!response.ok || !data?.tokens?.access?.value || !data?.user) {
      return null
    }

    return {
      ...data,
      api_key: credentials.api_key,
    }
  },
} as any) as any

export const authOptions: NextAuthOptions = {
  providers: [credentialsProvider],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt(params: unknown): Promise<AuthToken> {
      const { token, user } = params as { token: AuthToken; user?: any }

      // On initial sign in, `user` is the object returned from `authorize`
      if (user) {
        return {
          ...token,
          user: user.user ?? user,
          tokens: user.tokens ?? token.tokens,
          api_key: user.api_key ?? token.api_key,
          accessTokenExpires: user?.tokens?.access?.expires_at ?? token.accessTokenExpires,
        }
      }

      // If token still valid, reuse
      if (token.accessTokenExpires && Date.now() < token.accessTokenExpires - REFRESH_BUFFER_MS) {
        return token
      }

      // Refresh and return new token
      return refreshAccessToken(token)
    },
    async session({ session, token }) {
      session.user = token.user
      session.api_key = token.api_key
      session.access_token = token.tokens?.access?.value ?? ""

      return session
    },
  },
  debug: process.env.NODE_ENV === "development",
}
