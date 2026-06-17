import { RoleDto, UserDto } from "@/dtos"
import { authOptions } from "@/lib/next-auth"
import { getUser } from "@/services/user.service"
import { getServerSession } from "next-auth/next"
import UserInformation from "./UserInformation"
import { getUserRoles } from "@/services/user-role.service"
import { UserRolesDto } from "@/dtos/UserRoleDto"
import { getRoles } from "@/services/role.service"
import { ProtectedRoute } from "@/components/shared/ProtectedRoute"
import { hasPermission } from "@/lib/rbac"

export const dynamic = "force-dynamic"

export default async function Page({
    params,
}: Readonly<{
    params: Promise<{ userId: string }>
}>) {
    const { userId } = await params
    const user = await getUserData(userId)

    const session = await getServerSession(authOptions)
    const authPermissions = session?.permissions;
    let isSelf: boolean = false;

    if(userId == session?.user.id.toString()){
        isSelf = true;
    }

    const [canViewUserRoles, canViewRoles] = [
        isSelf ? true : hasPermission( [
            "view:user-role",
            "admin:user-role",
        ],
        authPermissions
        ),
        isSelf ? true : hasPermission( [
            "view:role",
            "admin:role",
        ],
        authPermissions
        )
    ]

      // Only fetch if allowed
    const [userRoles, roles] = await Promise.all([
        canViewUserRoles ? getUserRolesData(userId) : Promise.resolve(undefined),
        canViewRoles ? getRolesData() : Promise.resolve(undefined),
    ])

    return <ProtectedRoute requiredPermission={['view:user', 'admin:user']}>
        <UserInformation user={user} userRoles={userRoles} roles={roles} />
    </ProtectedRoute>
}

async function getUserData(userId: string): Promise<UserDto> {
    const session = await getServerSession(authOptions)

    if (!session?.access_token || !session.api_key) {
        throw new Error("Unauthorized")
    }

    const user = await getUser({
        userId: userId,
        accessToken: session.access_token,
        apiKey: session.api_key,
    })

    return user
}

async function getUserRolesData(userId: string): Promise<UserRolesDto[]> {
    const session = await getServerSession(authOptions)

    if (!session?.access_token || !session.api_key) {
        throw new Error("Unauthorized")
    }

    const userRoles = await getUserRoles({
        userId: Number.parseInt(userId),
        accessToken: session.access_token,
        apiKey: session.api_key,
    })

    return userRoles
}

async function getRolesData(): Promise<RoleDto[]> {
    const session = await getServerSession(authOptions)

    if (!session?.access_token || !session.api_key) {
        throw new Error("Unauthorized")
    }

    const roles = await getRoles({
        accessToken: session.access_token,
        apiKey: session.api_key,
    })

    return roles
}
