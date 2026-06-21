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

export const dynamic = "force-dynamic"

export default async function Page({
    params,
}: Readonly<{
    params: Promise<{ roleId: string }>
}>) {
    const { roleId } = await params
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect("/login")
    }

    if (!checkPermission(session, ["view:role", "admin:role"])) {
        redirect("/403")
    }

    const [role, rolePolicies, policies] = await Promise.all([
        getRoleData(roleId),
        getRolePoliciesData(roleId),
        getPoliciesData(),
    ])

    return (
        <RoleInformation
            role={role}
            rolePolicies={rolePolicies}
            policies={policies}
        />
    )
}

async function getRoleData(roleId: string): Promise<RoleDto> {
    const session = await getServerSession(authOptions)

    if (!session?.access_token || !session.api_key) {
        throw new Error("Unauthorized")
    }

    const role = await getRole({
        roleId,
        accessToken: session.access_token,
        apiKey: session.api_key,
    })

    console.log(role)
    return role
}

async function getRolePoliciesData(roleId: string): Promise<RolePolicyDto[]> {
    const session = await getServerSession(authOptions)

    if (!session?.access_token || !session.api_key) {
        throw new Error("Unauthorized")
    }

    return await getRolePolicies({
        roleId: Number.parseInt(roleId, 10),
        accessToken: session.access_token,
        apiKey: session.api_key,
    })
}

async function getPoliciesData(): Promise<PolicyDto[]> {
    const session = await getServerSession(authOptions)

    if (!session?.access_token || !session.api_key) {
        throw new Error("Unauthorized")
    }

    return await getPolicies({
        accessToken: session.access_token,
        apiKey: session.api_key,
    })
}
