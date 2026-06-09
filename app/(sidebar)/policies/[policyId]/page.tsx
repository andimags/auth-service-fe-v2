import { PermissionDto } from "@/dtos/PermissionDto"
import { PolicyDto } from "@/dtos/PolicyDto"
import { PolicyPermissionDto } from "@/dtos/PolicyPermissionDto"
import { authOptions } from "@/lib/next-auth"
import { getPermissions } from "@/services/permission.service"
import { getPolicyPermissions } from "@/services/policy-permission.service"
import { getPolicy } from "@/services/policy.service"
import { getServerSession } from "next-auth/next"
import PolicyInformation from "./PolicyInformation"

export const dynamic = "force-dynamic"

export default async function Page({
    params,
}: Readonly<{
    params: Promise<{ policyId: string }>
}>) {
    const { policyId } = await params
    const [policy, policyPermissions, permissions] = await Promise.all([
        getPolicyData(policyId),
        getPolicyPermissionsData(policyId),
        getPermissionsData(),
    ])

    return (
        <PolicyInformation
            policy={policy}
            policyPermissions={policyPermissions}
            permissions={permissions}
        />
    )
}

async function getPolicyData(policyId: string): Promise<PolicyDto> {
    const session = await getServerSession(authOptions)

    if (!session?.access_token || !session.api_key) {
        throw new Error("Unauthorized")
    }

    return await getPolicy({
        policyId,
        accessToken: session.access_token,
        apiKey: session.api_key,
    })
}

async function getPolicyPermissionsData(
    policyId: string
): Promise<PolicyPermissionDto[]> {
    const session = await getServerSession(authOptions)

    if (!session?.access_token || !session.api_key) {
        throw new Error("Unauthorized")
    }

    return await getPolicyPermissions({
        policyId: Number.parseInt(policyId, 10),
        accessToken: session.access_token,
        apiKey: session.api_key,
    })
}

async function getPermissionsData(): Promise<PermissionDto[]> {
    const session = await getServerSession(authOptions)

    if (!session?.access_token || !session.api_key) {
        throw new Error("Unauthorized")
    }

    return await getPermissions({
        accessToken: session.access_token,
        apiKey: session.api_key,
    })
}
