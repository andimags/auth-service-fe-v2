import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/next-auth"

export async function GET(
    request: Request,
    { params }: { params: Promise<{ userId: string }> }
) {
    try {
        const { userId } = await params

        const session = await getServerSession(authOptions)
        const accessToken = session?.access_token;
        const apiKey = session?.api_key;

        console.log('apiKey', apiKey)
        console.log('session', session)
        console.log('accessToken', accessToken)

        if (!session?.user?.email || !apiKey || !accessToken) {

            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            )
        }

        const res = await fetch(
            `${process.env.AUTH_SERVICE_BASE_URL}/users/${userId}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                    "x-api-key": apiKey
                },
                cache: "no-store",
            }
        )

        if (!res.ok) {
            return NextResponse.json(
                { message: "Failed to fetch user data" },
                { status: res.status }
            )
        }

        const user = await res.json()

        // 3. Return user data to frontend
        return NextResponse.json(user)
    } catch (error) {
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        )
    }
}