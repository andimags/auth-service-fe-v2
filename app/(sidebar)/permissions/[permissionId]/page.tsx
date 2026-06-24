import { PermissionDto } from "@/dtos/PermissionDto"
import { authOptions } from "@/lib/next-auth"
import { getPermission } from "@/services/permission.service"
import { getServerSession } from "next-auth/next"
import PermissionInformation from "./PermissionInformation"
import { redirect } from "next/navigation"
import { isForbiddenError } from "@/services/http/fetcher"
import { ProtectedRoute } from "@/components/shared/ProtectedRoute"

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

    const permissionResult = await getPermissionData(permissionId)

    if (!permissionResult.allowed || !permissionResult.data) {
        redirect("/403")
    }

    return (
        <ProtectedRoute>
            <PermissionInformation permission={permissionResult.data} />
        </ProtectedRoute>
    )
}

async function getPermissionData(
    permissionId: string
): Promise<{ data: PermissionDto | null; allowed: boolean }> {
    const session = await getServerSession(authOptions)

    if (!session?.access_token || !session.api_key) {
        throw new Error("Unauthorized")
    }

    try {
        const permission = await getPermission({
            permissionId,
            accessToken: session.access_token,
            apiKey: session.api_key,
        })

        return { data: permission, allowed: true }
    } catch (error) {
        if (isForbiddenError(error)) {
            return { data: null, allowed: false }
        }
        throw error
    }
}
