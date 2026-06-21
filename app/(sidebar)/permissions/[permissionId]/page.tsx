import { PermissionDto } from "@/dtos/PermissionDto"
import { authOptions } from "@/lib/next-auth"
import { getPermission } from "@/services/permission.service"
import { getServerSession } from "next-auth/next"
import PermissionInformation from "./PermissionInformation"
import { checkPermission } from "@/lib/rbac"
import { redirect } from "next/navigation"

export const dynamic = "force-dynamic"

export default async function Page({
    params,
}: Readonly<{
    params: Promise<{ permissionId: string }>
}>) {
    const { permissionId } = await params
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect("/login")
    }

    if (!checkPermission(session, ["view:permission", "admin:permission"])) {
        redirect("/403")
    }

    const permission = await getPermissionData(permissionId)

    return <PermissionInformation permission={permission} />
}

async function getPermissionData(permissionId: string): Promise<PermissionDto> {
    const session = await getServerSession(authOptions)

    if (!session?.access_token || !session.api_key) {
        throw new Error("Unauthorized")
    }

    return await getPermission({
        permissionId,
        accessToken: session.access_token,
        apiKey: session.api_key,
    })
}
