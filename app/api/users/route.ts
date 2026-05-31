import { CreateUserDto } from "@/dtos"
import { authOptions } from "@/lib/next-auth"
import { addUser } from "@/services/user.service"
import { getServerSession } from "next-auth/next"
import { NextResponse } from "next/server"

export async function POST(
    request: Request
) {
    try {
        const session = await getServerSession(authOptions)
        const accessToken = session?.access_token
        const apiKey = session?.api_key

        if (!session?.user?.email || !apiKey || !accessToken) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            )
        }

        const payload: CreateUserDto = await request.json()
        
        console.log("payload from proxy", payload);

        const response = await addUser({
            payload,
            accessToken,
            apiKey
        })

        return NextResponse.json(response)
    } catch(error) {
        console.log(error)

        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        )
    }
}
