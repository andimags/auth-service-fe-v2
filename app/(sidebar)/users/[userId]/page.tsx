import { UserDto } from "@/dtos"
import { authOptions } from "@/lib/next-auth"
import { getUser } from "@/services/user.service"
import { getServerSession } from "next-auth/next"
import UserInformation from "./UserInformation"

export const dynamic = "force-dynamic"

export default async function Page({
    params,
}: Readonly<{
    params: Promise<{ userId: string }>
}>) {
    const { userId } = await params
    const user = await getUserData(userId)

    return (
        <UserInformation user={user} />
    )
}

async function getUserData(userId: string): Promise<UserDto> {
    const session = await getServerSession(authOptions)

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
