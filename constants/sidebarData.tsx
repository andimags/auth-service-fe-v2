import { HugeiconsIcon } from "@hugeicons/react"
import {
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
            requiredPermissions: ['view:user', 'admin:user']
        },
        {
            title: "Channels",
            url: "/channels",
            icon: <HugeiconsIcon icon={CableIcon} strokeWidth={2} />,
            requiredPermissions: ['view:channel', 'admin:channel']
        },
        {
            title: "Roles",
            url: "/roles",
            icon: <HugeiconsIcon icon={ShieldUserIcon} strokeWidth={2} />,
            requiredPermissions: ['view:role', 'admin:role']
        },
        {
            title: "Policies",
            url: "/policies",
            icon: <HugeiconsIcon icon={ShieldBlockchainIcon} strokeWidth={2} />,
            requiredPermissions: ['view:policy', 'admin:policy']
        },
        {
            title: "Permissions",
            url: "/permissions",
            icon: <HugeiconsIcon icon={ShieldKeyIcon} strokeWidth={2} />,
            requiredPermissions: ['view:permission', 'admin:permission']
        },
    ],
}

export default sidebarData
