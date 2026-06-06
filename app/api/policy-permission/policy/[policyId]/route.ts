import { ReplacePolicyPermissionsDto } from "@/dtos/PolicyPermissionDto"
import { authOptions } from "@/lib/next-auth"
import { getPolicyPermissions, replacePolicyPermissions } from "@/services/policy-permission.service"
import { getServerSession } from "next-auth/next"
import { NextResponse } from "next/server"

export async function GET(
    request: Request,
    { params }: { params: Promise<{ policyId: string }> }
) {
    try {
        const { policyId } = await params
        const session = await getServerSession(authOptions)
        const accessToken = session?.access_token
        const apiKey = session?.api_key

        if (!session?.user?.email || !apiKey || !accessToken || !policyId) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            )
        }

        const response = await getPolicyPermissions({
            policyId,
            accessToken,
            apiKey
        })

        return NextResponse.json(response)
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        )
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ policyId: string }> }
) {
    try {
        const { policyId } = await params
        const session = await getServerSession(authOptions)
        const accessToken = session?.access_token
        const apiKey = session?.api_key

        if (!session?.user?.email || !apiKey || !accessToken || !policyId) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            )
        }

        const payload: ReplacePolicyPermissionsDto = await request.json()
                
        const response = await replacePolicyPermissions({
            policyId,
            payload,
            accessToken,
            apiKey
        })

        return NextResponse.json(response)
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        )
    }
}
