import { CreateUserDto } from "@/dtos"
import { authOptions } from "@/lib/next-auth"
import { addUser } from "@/services/user.service"
import { getServerSession } from "next-auth/next"
import { NextResponse } from "next/server"

const AUTH_SERVICE_BASE_URL = process.env.AUTH_SERVICE_BASE_URL

if (!AUTH_SERVICE_BASE_URL) {
    throw new Error("AUTH_SERVICE_BASE_URL value is undefined")
}

export async function GET(request: Request) {
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

        const { search } = new URL(request.url)

        const res = await fetch(`${AUTH_SERVICE_BASE_URL}/api/users${search}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
                "x-api-key": apiKey,
            },
            cache: "no-store",
        })

        if (!res.ok) {
            return NextResponse.json(
                { message: "Failed to fetch users" },
                { status: res.status }
            )
        }

        const data = await res.json()

        return NextResponse.json(data)
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        )
    }
}

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
