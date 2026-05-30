import { authOptions } from "@/lib/next-auth"
import { getServerSession } from "next-auth/next"
import { NextResponse } from "next/server"

const BASE_URL =
    process.env.NEXT_PUBLIC_BASE_URL ?? process.env.NEXTAUTH_URL ?? "http://localhost:3000"

export async function GET(
    request: Request,
    { params }: { params: Promise<{ userId: string }> }
) {
    try {
        const { userId } = await params

        const session = await getServerSession(authOptions)
        const accessToken = session?.access_token;
        const apiKey = session?.api_key;

        if (!session?.user?.email || !apiKey || !accessToken) {

            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            )
        }

        const res = await fetch(`${BASE_URL}/backend/users/${userId}`, {
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
                { message: "Failed to fetch user data" },
                { status: res.status }
            )
        }

        const user = await res.json()

        return NextResponse.json(user)
    } catch {
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        )
    }
}