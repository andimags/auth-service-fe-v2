import { RoleDto, UserDto } from "@/dtos"
import { authOptions } from "@/lib/next-auth"
import { getUser } from "@/services/user.service"
import { getServerSession } from "next-auth/next"
import UserInformation from "./UserInformation"
import { getUserRoles } from "@/services/user-role.service"
import { UserRolesDto } from "@/dtos/UserRoleDto"
import { getRoles } from "@/services/role.service"
import { ProtectedRoute } from "@/components/shared/ProtectedRoute"
import { checkPermission } from "@/lib/rbac"

export const dynamic = "force-dynamic"

export default async function Page({
    params,
}: Readonly<{
    params: Promise<{ userId: string }>
}>) {
    const { userId } = await params
    const session = await getServerSession(authOptions)

    if (!session) {
        throw new Error("Unauthorized")
    }

    const isSelf = userId === session.user.id.toString()

    const canViewUserRoles = isSelf || checkPermission(session, [
        "view:user-role",
        "admin:user-role",
    ])
    
    const canViewRoles = isSelf || checkPermission(session, [
        "view:role",
        "admin:role",
    ])

    const canManageRoles = checkPermission(session, [
        "admin:user-role",
    ])

    // Only fetch if allowed
    const [user, userRoles, roles] = await Promise.all([
        getUserData(userId),
        canViewUserRoles ? getUserRolesData(userId) : Promise.resolve([]),
        canViewRoles ? getRolesData() : Promise.resolve([]),
    ])

    return (
        <ProtectedRoute requiredPermission={["view:user", "admin:user"]}>
            <UserInformation
                user={user}
                userRoles={userRoles}
                roles={roles}
                canViewRoles={canViewRoles}
                canViewUserRoles={canViewUserRoles}
                canManageRoles={canManageRoles}
            />
        </ProtectedRoute>
    )
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
