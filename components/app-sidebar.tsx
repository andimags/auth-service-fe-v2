"use client"

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
import { HugeiconsIcon } from "@hugeicons/react"
import {
    DashboardSquare01Icon,
    UserGroupIcon,
    CommandIcon,
    CableIcon,
    ShieldUserIcon,
    ShieldBlockchainIcon,
    ShieldKeyIcon,
} from "@hugeicons/core-free-icons"

const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Dashboard",
            url: "/",
            icon: (
                <HugeiconsIcon icon={DashboardSquare01Icon} strokeWidth={2} />
            ),
        },
        {
            title: "Users",
            url: "/users",
            icon: <HugeiconsIcon icon={UserGroupIcon} strokeWidth={2} />,
        },
        {
            title: "Channels",
            url: "/channels",
            icon: <HugeiconsIcon icon={CableIcon} strokeWidth={2} />,
        },
        {
            title: "Roles",
            url: "/roles",
            icon: <HugeiconsIcon icon={ShieldUserIcon} strokeWidth={2} />,
        },
        {
            title: "Policies",
            url: "/policies",
            icon: <HugeiconsIcon icon={ShieldBlockchainIcon} strokeWidth={2} />,
        },
        {
            title: "Permissions",
            url: "/permissions",
            icon: <HugeiconsIcon icon={ShieldKeyIcon} strokeWidth={2} />,
        }
    ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
        </Sidebar>
    )
}
