import { Geist_Mono, Inter } from "next/font/google"

import { QueryProvider } from "@/components/providers/query-provider"
import { SessionProvider } from "@/components/providers/session-provider"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { ConfirmDialog } from "@/components/shared/confirm-dialog/ConfirmDialog"
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import "./globals.css"
import { UserFormDialog } from "@/components/shared/user-form-dialog/UserFormDialog"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
})

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className={cn(
                "antialiased",
                fontMono.variable,
                "font-sans",
                inter.variable
            )}
        >
            <body>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem={false}
                    disableTransitionOnChange
                >
                    <TooltipProvider>
                        <SessionProvider>
                            <QueryProvider>
                                <Toaster />
                                <ConfirmDialog />
                                <UserFormDialog />
                                {children}
                            </QueryProvider>
                        </SessionProvider>
                    </TooltipProvider>
                </ThemeProvider>
            </body>
        </html>
    )
}
