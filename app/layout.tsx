import { Geist_Mono, Inter } from "next/font/google"

import { QueryProvider } from "@/components/providers/query-provider"
import { SessionProvider } from "@/components/providers/session-provider"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { ConfirmDialog } from "@/components/shared/confirm-dialog/ConfirmDialog"
import { RoleFormDialog } from "@/components/shared/role-form-dialog/RoleFormDialog"
import { UserFormDialog } from "@/components/shared/user-form-dialog/UserFormDialog"
import { PolicyFormDialog } from "@/components/shared/policy-form-dialog/PolicyFormDialog"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import "./globals.css"
import { ChannelFormDialog } from "@/components/shared/channel-form-dialog/ChannelFormDialog"
import { PermissionFormDialog } from "@/components/shared/permission-form-dialog/PermissionFormDialog"

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
                                <RoleFormDialog />
                                <PolicyFormDialog />
                                <ChannelFormDialog />
                                <PermissionFormDialog />
                                {children}
                            </QueryProvider>
                        </SessionProvider>
                    </TooltipProvider>
                </ThemeProvider>
            </body>
        </html>
    )
}
