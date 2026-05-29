"use client"

import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import sidebarData from "@/constants/sidebarData"
import { usePathname } from "next/navigation"

export function SiteHeader() {
    const pathname = usePathname()

    const getCurrentPageTitle = () => {
        const result = sidebarData.navMain.find((item) => {
            if (item.url === "/") return pathname === "/"

            return pathname === item.url || pathname.startsWith(item.url + "/")
        })

        return result?.title || "Untitled"
    }

    return (
        <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
            <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
                <SidebarTrigger className="-ml-1" />
                <Separator
                    orientation="vertical"
                    className="mx-2 data-[orientation=vertical]:h-4"
                />
                <h1 className="text-base font-medium">
                    {getCurrentPageTitle()}
                </h1>
            </div>
        </header>
    )
}
