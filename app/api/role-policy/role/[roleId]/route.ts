import { ReplaceRolePoliciesDto } from "@/dtos/RolePolicyDto"
import { authOptions } from "@/lib/next-auth"
import { getRolePolicies, replaceRolePolicies } from "@/services/role-policy.service"
import { getServerSession } from "next-auth/next"
import { NextResponse } from "next/server"

export async function GET(
    request: Request,
    { params }: { params: Promise<{ roleId: string }> }
) {
    try {
        const { roleId } = await params
        const session = await getServerSession(authOptions)
        const accessToken = session?.access_token
        const apiKey = session?.api_key

        if (!session?.user?.email || !apiKey || !accessToken || !roleId) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            )
        }

        const response = await getRolePolicies({
            roleId,
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
    { params }: { params: Promise<{ roleId: string }> }
) {
    try {
        const { roleId } = await params
        const session = await getServerSession(authOptions)
        const accessToken = session?.access_token
        const apiKey = session?.api_key

        if (!session?.user?.email || !apiKey || !accessToken || !roleId) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            )
        }

        const payload: ReplaceRolePoliciesDto = await request.json()
                
        const response = await replaceRolePolicies({
            roleId,
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
