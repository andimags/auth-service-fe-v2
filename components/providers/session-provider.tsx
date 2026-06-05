"use client"

import {
    SessionProvider as NextAuthSessionProvider,
    signOut,
    useSession,
} from "next-auth/react"
import { useEffect } from "react"

function SessionWatcher() {
    const { data: session } = useSession()

    useEffect(() => {
        if (session?.error !== "RefreshTokenError") return
        signOut()
    }, [session?.error])

    return null
}

export function SessionProvider({
    children,
}: Readonly<React.PropsWithChildren>) {
    return (
        <NextAuthSessionProvider
            refetchInterval={30}
            refetchOnWindowFocus={true}
        >
            <SessionWatcher />
            {children}
        </NextAuthSessionProvider>
    )
}