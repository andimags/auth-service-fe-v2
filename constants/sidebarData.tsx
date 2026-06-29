import {
    CableIcon,
    ShieldBlockchainIcon,
    ShieldKeyIcon,
    ShieldUserIcon,
    UserGroupIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

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
            requiredPermissions: ['auth:view:user', 'auth:admin:user']
        },
        {
            title: "Channels",
            url: "/channels",
            icon: <HugeiconsIcon icon={CableIcon} strokeWidth={2} />,
            requiredPermissions: ['auth:view:channel', 'auth:admin:channel']
        },
        {
            title: "Roles",
            url: "/roles",
            icon: <HugeiconsIcon icon={ShieldUserIcon} strokeWidth={2} />,
            requiredPermissions: ['auth:view:role', 'auth:admin:role']
        },
        {
            title: "Policies",
            url: "/policies",
            icon: <HugeiconsIcon icon={ShieldBlockchainIcon} strokeWidth={2} />,
            requiredPermissions: ['auth:view:policy', 'auth:admin:policy']
        },
        {
            title: "Permissions",
            url: "/permissions",
            icon: <HugeiconsIcon icon={ShieldKeyIcon} strokeWidth={2} />,
            requiredPermissions: ['auth:view:permission', 'auth:admin:permission']
        },
    ],
}

export default sidebarData
