import { PolicyDto } from "@/dtos/PolicyDto"
import { RoleDto } from "@/dtos/RoleDto"
import { RolePolicyDto } from "@/dtos/RolePolicyDto"
import { authOptions } from "@/lib/next-auth"
import { getPolicies } from "@/services/policy.service"
import { getRolePolicies } from "@/services/role-policy.service"
import { getRole } from "@/services/role.service"
import { getServerSession } from "next-auth/next"
import RoleInformation from "./RoleInformation"
import { checkPermission } from "@/lib/rbac"
import { redirect } from "next/navigation"
import { isForbiddenError } from "@/services/http/fetcher"
import { ProtectedRoute } from "@/components/shared/ProtectedRoute"

export const dynamic = "force-dynamic"

export default async function Page({
    params,
}: Readonly<{
    params: Promise<{ roleId: string }>
}>) {
    const { roleId } = await params
    const session = await getServerSession(authOptions)
    const canManagePolicies = checkPermission(session, ["admin:user_role", "assign:user_role", "update:user_role"])
    
    const [roleResult, rolePoliciesResult, policiesResult] = await Promise.all([
        getRoleData(roleId),
        getRolePoliciesData(roleId),
        getPoliciesData(),
    ])

    if (!roleResult.allowed || !roleResult.data) {
        redirect("/403")
    }

    return (
        <ProtectedRoute>
            <RoleInformation
                role={roleResult.data}
                rolePolicies={rolePoliciesResult.data}
                policies={policiesResult.data}
                canViewPolicies={policiesResult.allowed}
                canViewRolePolicies={rolePoliciesResult.allowed}
                canManagePolicies={canManagePolicies}
            />
        </ProtectedRoute>
    )
}

async function getRoleData(
    roleId: string
): Promise<{ data: RoleDto | null; allowed: boolean }> {
    const session = await getServerSession(authOptions)

    if (!session?.access_token || !session.api_key) {
        throw new Error("Unauthorized")
    }

    try {
        const role = await getRole({
            roleId,
            accessToken: session.access_token,
            apiKey: session.api_key,
        })

        return { data: role, allowed: true }
    } catch (error) {
        if (isForbiddenError(error)) {
            return { data: null, allowed: false }
        }
        throw error
    }
}

async function getRolePoliciesData(
    roleId: string
): Promise<{ data: RolePolicyDto[]; allowed: boolean }> {
    const session = await getServerSession(authOptions)

    if (!session?.access_token || !session.api_key) {
        throw new Error("Unauthorized")
    }

    try {
        const rolePolicies = await getRolePolicies({
            roleId: Number.parseInt(roleId, 10),
            accessToken: session.access_token,
            apiKey: session.api_key,
        })

        return { data: rolePolicies, allowed: true }
    } catch (error) {
        if (isForbiddenError(error)) {
            return { data: [], allowed: false }
        }
        throw error
    }
}

async function getPoliciesData(): Promise<{
    data: PolicyDto[]
    allowed: boolean
}> {
    const session = await getServerSession(authOptions)

    if (!session?.access_token || !session.api_key) {
        throw new Error("Unauthorized")
    }

    try {
        const policies = await getPolicies({
            accessToken: session.access_token,
            apiKey: session.api_key,
        })

        return { data: policies, allowed: true }
    } catch (error) {
        if (isForbiddenError(error)) {
            return { data: [], allowed: false }
        }
        throw error
    }
}
