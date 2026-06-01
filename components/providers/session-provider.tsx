"use client"

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react"

export function SessionProvider({
    children
}: Readonly<React.ComponentProps<typeof NextAuthSessionProvider>>) {
    return (
        <NextAuthSessionProvider
            refetchInterval={60}    // should match your updateAge (60s)
            refetchOnWindowFocus={true}
        >
            {children}
        </NextAuthSessionProvider>
    )
}
