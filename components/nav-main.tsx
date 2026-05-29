"use client"

import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"

function isActivePath(pathname: string, itemUrl: string) {
    if (itemUrl === "/") return pathname === "/"

    return pathname === itemUrl || pathname.startsWith(itemUrl + "/")
}

export function NavMain({
    items,
}: Readonly<{
    items: {
        title: string
        url: string
        icon?: React.ReactNode
    }[]
}>) {
    const pathname = usePathname()

    return (
        <SidebarGroup>
            <SidebarGroupContent className="flex flex-col gap-2">
                <SidebarMenu>
                    {items.map((item) => {
                        const active = isActivePath(pathname, item.url)

                        return (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton
                                    tooltip={item.title}
                                    asChild
                                    isActive={active}
                                >
                                    <Link
                                        href={item.url}
                                        className="flex items-center gap-2"
                                    >
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )
                    })}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}
