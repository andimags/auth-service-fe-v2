import { Badge } from "@/components/ui/badge"
import { UserDto } from "@/dtos"
import { authOptions } from "@/lib/next-auth"
import { formatDate } from "@/lib/utils"
import { getServerSession } from "next-auth/next"

export const dynamic = "force-dynamic"

export default async function Page({
    params,
}: {
    params: Promise<{ userId: string }>
}) {
    const { userId } = await params
    const data = await getUserData(userId) as UserDto;
    console.log("yooo", data)

    return (
        <div className="mx-auto w-full max-w-6xl text-neutral-900 transition-colors duration-200 dark:text-neutral-100">
            <div className="flex items-start justify-between pb-6">
                <div>
                    <h2 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-white">
                        User Information
                    </h2>
                    <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                        Personal details and general information
                    </p>
                </div>
                <button className="rounded-md border border-neutral-300 px-4 py-1.5 text-sm font-medium transition-colors hover:bg-neutral-50 dark:border-neutral-600 dark:hover:bg-neutral-800">
                    Edit
                </button>
            </div>

            <div className="text-sm">
                <div className="grid grid-cols-3 border-t border-neutral-200 py-5 dark:border-neutral-800">
                    <div className="font-semibold text-neutral-900 dark:text-neutral-200">
                        Full name
                    </div>
                    <div className="col-span-2 text-neutral-600 dark:text-neutral-400">
                        {data.last_name}, {data.first_name}
                    </div>
                </div>

                <div className="grid grid-cols-3 border-t border-neutral-200 py-5 dark:border-neutral-800">
                    <div className="font-semibold text-neutral-900 dark:text-neutral-200">
                        Username
                    </div>
                    <div className="col-span-2 text-neutral-600 dark:text-neutral-400">
                        {data.username}
                    </div>
                </div>

                <div className="grid grid-cols-3 border-t border-neutral-200 py-5 dark:border-neutral-800">
                    <div className="font-semibold text-neutral-900 dark:text-neutral-200">
                        Email address
                    </div>
                    <div className="col-span-2 text-neutral-600 dark:text-neutral-400">
                        {data.email}
                    </div>
                </div>

                <div className="grid grid-cols-3 border-t border-neutral-200 py-5 dark:border-neutral-800">
                    <div className="font-semibold text-neutral-900 dark:text-neutral-200">
                        Status
                    </div>
                    <div className="col-span-2 text-neutral-600 dark:text-neutral-400">
                        {data.status}
                    </div>
                </div>

                <div className="grid grid-cols-3 border-t border-neutral-200 py-5 dark:border-neutral-800">
                    <div className="font-semibold text-neutral-900 dark:text-neutral-200">
                        Level
                    </div>
                    <div className="col-span-2 text-neutral-600 dark:text-neutral-400">
                        {data.level}
                    </div>
                </div>

                <div className="grid grid-cols-3 border-t border-neutral-200 py-5 dark:border-neutral-800">
                    <div className="font-semibold text-neutral-900 dark:text-neutral-200">
                        Created
                    </div>
                    <div className="col-span-2 text-neutral-600 dark:text-neutral-400">
                        {formatDate(data.created_at)}
                    </div>
                </div>

                <div className="grid grid-cols-3 border-t border-neutral-200 py-5 dark:border-neutral-800">
                    <div className="font-semibold text-neutral-900 dark:text-neutral-200">
                        Last Updated
                    </div>
                    <div className="col-span-2 text-neutral-600 dark:text-neutral-400">
                        {formatDate(data.updated_at)}
                    </div>
                </div>

                <div className="grid grid-cols-3 border-t border-neutral-200 py-5 dark:border-neutral-800">
                    <div className="font-semibold text-neutral-900 dark:text-neutral-200">
                        Roles
                    </div>
                    <div className="col-span-2 text-neutral-600 dark:text-neutral-400 gap-2 flex">
                        <Badge variant="outline">Outline</Badge>
                        <Badge variant="outline">Outline</Badge>
                        <Badge variant="outline">Outline</Badge>
                    </div>
                </div>
            </div>
        </div>
    )
}

async function getUserData(userId: string) {
    try {
        console.log("Fetching user:", userId)

        const session = await getServerSession(authOptions)

        console.log("Session:", {
            email: session?.user?.email,
            hasAccessToken: !!session?.access_token,
            hasApiKey: !!session?.api_key,
        })

        if (!session?.user?.email || !session.access_token || !session.api_key) {
            throw new Error("Unauthorized")
        }

        const baseUrl =
            process.env.NEXT_PUBLIC_BASE_URL ??
            process.env.NEXTAUTH_URL ??
            "http://localhost:3000"

        console.log("Base URL:", baseUrl)

        const url = `${baseUrl}/backend/api/users/${userId}`

        console.log("Request URL:", url)

        const res = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session.access_token}`,
                "x-api-key": session.api_key,
            },
            cache: "no-store",
        })

        console.log("Response status:", res.status)
        console.log("Response ok:", res.ok)

        const responseText = await res.text()

        console.log("Raw response:", responseText)

        if (!res.ok) {
            throw new Error(
                `Failed to fetch data. Status: ${res.status}. Response: ${responseText}`
            )
        }

        return JSON.parse(responseText)
    } catch (error) {
        console.error("getUserData error:", error)

        throw error
    }
}