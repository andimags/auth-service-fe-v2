import { RoleDto, UserDto } from "@/dtos"
import { authOptions } from "@/lib/next-auth"
import { getUser } from "@/services/user.service"
import { getServerSession } from "next-auth/next"
import UserInformation from "./UserInformation"
import { getUserRoles } from "@/services/user-role.service"
import { UserRolesDto } from "@/dtos/UserRoleDto"
import { getRoles } from "@/services/role.service"

export const dynamic = "force-dynamic"

export default async function Page({
    params,
}: Readonly<{
    params: Promise<{ userId: string }>
}>) {
    const { userId } = await params
    const user = await getUserData(userId)
    const userRoles = await getUserRolesData(userId)
    const roles = await getRolesData()

    return <UserInformation user={user} userRoles={userRoles} roles={roles} />
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
