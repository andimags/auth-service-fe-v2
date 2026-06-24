import { ProtectedRoute } from "@/components/shared/ProtectedRoute"
import { PermissionDto } from "@/dtos/PermissionDto"
import { PolicyDto } from "@/dtos/PolicyDto"
import { PolicyPermissionDto } from "@/dtos/PolicyPermissionDto"
import { authOptions } from "@/lib/next-auth"
import { checkPermission } from "@/lib/rbac"
import { isForbiddenError } from "@/services/http/fetcher"
import { getPermissions } from "@/services/permission.service"
import { getPolicyPermissions } from "@/services/policy-permission.service"
import { getPolicy } from "@/services/policy.service"
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import PolicyInformation from "./PolicyInformation"

export const dynamic = "force-dynamic"

export default async function Page({
    params,
}: Readonly<{
    params: Promise<{ policyId: string }>
}>) {
    const { policyId } = await params
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect("/login")
    }

    const canManagePermissions = checkPermission(session, [
        "admin:policy_permission",
        "assign:policy_permission",
        "update:policy_permission",
        "update:policy",
        "admin:policy",
    ])

    const [policyResult, policyPermissionsResult, permissionsResult] = await Promise.all([
        getPolicyData(policyId),
        getPolicyPermissionsData(policyId),
        getPermissionsData(),
    ])

    if (!policyResult.allowed || !policyResult.data) {
        redirect("/403")
    }

    return (
        <ProtectedRoute>
            <PolicyInformation
                policy={policyResult.data}
                policyPermissions={policyPermissionsResult.data}
                permissions={permissionsResult.data}
                canViewPermissions={permissionsResult.allowed}
                canViewPolicyPermissions={policyPermissionsResult.allowed}
                canManagePermissions={canManagePermissions}
            />
        </ProtectedRoute>
    )
}

async function getPolicyData(
    policyId: string
): Promise<{ data: PolicyDto | null; allowed: boolean }> {
    const session = await getServerSession(authOptions)

    if (!session?.access_token || !session.api_key) {
        throw new Error("Unauthorized")
    }

    try {
        const policy = await getPolicy({
            policyId,
            accessToken: session.access_token,
            apiKey: session.api_key,
        })

        return { data: policy, allowed: true }
    } catch (error) {
        if (isForbiddenError(error)) {
            return { data: null, allowed: false }
        }
        throw error
    }
}

async function getPolicyPermissionsData(
    policyId: string
): Promise<{ data: PolicyPermissionDto[]; allowed: boolean }> {
    const session = await getServerSession(authOptions)

    if (!session?.access_token || !session.api_key) {
        throw new Error("Unauthorized")
    }

    try {
        const policyPermissions = await getPolicyPermissions({
            policyId: Number.parseInt(policyId, 10),
            accessToken: session.access_token,
            apiKey: session.api_key,
        })

        return { data: policyPermissions, allowed: true }
    } catch (error) {
        if (isForbiddenError(error)) {
            return { data: [], allowed: false }
        }
        throw error
    }
}

async function getPermissionsData(): Promise<{
    data: PermissionDto[]
    allowed: boolean
}> {
    const session = await getServerSession(authOptions)

    if (!session?.access_token || !session.api_key) {
        throw new Error("Unauthorized")
    }

    try {
        const permissions = await getPermissions({
            accessToken: session.access_token,
            apiKey: session.api_key,
        })

        return { data: permissions, allowed: true }
    } catch (error) {
        if (isForbiddenError(error)) {
            return { data: [], allowed: false }
        }
        throw error
    }
}
