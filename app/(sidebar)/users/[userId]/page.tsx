import { redirect } from "next/navigation"
import { RoleDto, UserDto } from "@/dtos"
import { authOptions } from "@/lib/next-auth"
import { getUser } from "@/services/user.service"
import { getServerSession } from "next-auth/next"
import UserInformation from "@/app/(sidebar)/users/[userId]/UserInformation"
import { getUserRoles } from "@/services/user-role.service"
import { UserRolesDto } from "@/dtos/UserRoleDto"
import { getRoles } from "@/services/role.service"
import { checkPermission } from "@/lib/rbac"
import { isForbiddenError } from "@/services/http/fetcher"

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

    // This one isn't tied to a fetch — it's purely "should the button
    // render," so it's fine as a plain permission check.
    const canManageRoles = checkPermission(session, ["admin:user-role", "assign:user_role", "update:user_role"])

    const [userResult, userRolesResult, rolesResult] = await Promise.all([
        getUserData(userId),
        getUserRolesData(userId),
        getRolesData(),
    ])

    // The BE's response is the only authority here — no isSelf, no
    // permission formula on the FE. If it said no, we redirect.
    if (!userResult.allowed || !userResult.data) {
        redirect("/403")
    }

    return (
        <UserInformation
            user={userResult.data}
            userRoles={userRolesResult.data}
            roles={rolesResult.data}
            canViewRoles={rolesResult.allowed}
            canViewUserRoles={userRolesResult.allowed}
            canManageRoles={canManageRoles}
        />
    )
}

async function getUserData(
    userId: string
): Promise<{ data: UserDto | null; allowed: boolean }> {
    const session = await getServerSession(authOptions)

    if (!session?.access_token || !session.api_key) {
        throw new Error("Unauthorized")
    }

    try {
        const user = await getUser({
            userId: userId,
            accessToken: session.access_token,
            apiKey: session.api_key,
        })
        return { data: user, allowed: true }
    } catch (error) {
        if (isForbiddenError(error)) {
            return { data: null, allowed: false }
        }
        throw error
    }
}

async function getUserRolesData(
    userId: string
): Promise<{ data: UserRolesDto[]; allowed: boolean }> {
    const session = await getServerSession(authOptions)

    if (!session?.access_token || !session.api_key) {
        throw new Error("Unauthorized")
    }

    try {
        const userRoles = await getUserRoles({
            userId: Number.parseInt(userId),
            accessToken: session.access_token,
            apiKey: session.api_key,
        })
        return { data: userRoles, allowed: true }
    } catch (error) {
        if (isForbiddenError(error)) {
            return { data: [], allowed: false }
        }
        throw error
    }
}

async function getRolesData(): Promise<{ data: RoleDto[]; allowed: boolean }> {
    const session = await getServerSession(authOptions)

    if (!session?.access_token || !session.api_key) {
        throw new Error("Unauthorized")
    }

    try {
        const roles = await getRoles({
            accessToken: session.access_token,
            apiKey: session.api_key,
        })
        return { data: roles, allowed: true }
    } catch (error) {
        console.log('isForbiddenError', isForbiddenError(error))
        if (isForbiddenError(error)) {
            return { data: [], allowed: false }
        }
        throw error
    }
}