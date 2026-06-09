import { HugeiconsIcon } from "@hugeicons/react"
import {
    DashboardSquare01Icon,
    UserGroupIcon,
    CableIcon,
    ShieldUserIcon,
    ShieldBlockchainIcon,
    ShieldKeyIcon,
} from "@hugeicons/core-free-icons"

export const sidebarData = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        // {
        //     title: "Dashboard",
        //     url: "/",
        //     icon: (
        //         <HugeiconsIcon icon={DashboardSquare01Icon} strokeWidth={2} />
        //     ),
        // },
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
        },
    ],
}

export default sidebarData
