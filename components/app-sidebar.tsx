import { getServerSession } from "next-auth/next"
import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { authOptions } from "@/lib/next-auth"

import { sidebarData } from "@/constants/sidebarData"
import { CommandIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

// export const dynamic = "force-dynamic"

export async function AppSidebar(
    props: React.ComponentProps<typeof Sidebar>
) {
    const session = await getServerSession(authOptions)

    const user = {
        name: session?.user?.name ?? "Guest",
        email: session?.user?.email ?? "",
        avatar: session?.user?.image ?? "/avatars/default.jpg",
    }

    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:p-1.5!"
                        >
                            <a href="#">
                                <HugeiconsIcon
                                    icon={CommandIcon}
                                    strokeWidth={2}
                                    className="size-5!"
                                />
                                <span className="text-base font-semibold">
                                    Authentication Service
                                </span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={sidebarData.navMain} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
        </Sidebar>
    )
}