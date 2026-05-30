import { Badge } from "@/components/ui/badge"
import { UserDto } from "@/dtos"
import { authOptions } from "@/lib/next-auth"
import { formatDate } from "@/lib/utils"
import { getUser } from "@/services/user.service"
import { getServerSession } from "next-auth/next"

export const dynamic = "force-dynamic"

export default async function Page({
    params,
}: {
    params: Promise<{ userId: string }>
}) {
    const { userId } = await params
    const data = await getUserData(userId)

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
                    <div className="col-span-2 flex gap-2 text-neutral-600 dark:text-neutral-400">
                        <Badge variant="outline">Outline</Badge>
                        <Badge variant="outline">Outline</Badge>
                        <Badge variant="outline">Outline</Badge>
                    </div>
                </div>
            </div>
        </div>
    )
}

async function getUserData(userId: string): Promise<UserDto> {
    const session = await getServerSession(authOptions)

    console.log('access_token: ', session?.access_token)
    console.log('api_key: ', session?.api_key)

    if (!session?.access_token || !session.api_key) {
        throw new Error("Unauthorized")
    }

    const user = await getUser({
        userId: userId,
        accessToken: session.access_token,
        apiKey: session.api_key,
    })

    return user
}
