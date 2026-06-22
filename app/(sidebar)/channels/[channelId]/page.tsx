import { ChannelDto } from "@/dtos/ChannelDto"
import { authOptions } from "@/lib/next-auth"
import { getChannel } from "@/services/channel.service"
import { getServerSession } from "next-auth/next"
import ChannelInformation from "./ChannelInformation"
import { redirect } from "next/navigation"
import { isForbiddenError } from "@/services/http/fetcher"

export const dynamic = "force-dynamic"

export default async function Page({
    params,
}: Readonly<{
    params: Promise<{ channelId: string }>
}>) {
    const { channelId } = await params

    const channelResult = await getChannelData(channelId)

    if (!channelResult.allowed || !channelResult.data) {
        redirect("/403")
    }

    if(channelResult.allowed){
        return <ChannelInformation channel={channelResult.data} />
    }
}

async function getChannelData(
    channelId: string
): Promise<{ data: ChannelDto | null; allowed: boolean }> {
    const session = await getServerSession(authOptions)

    if (!session?.access_token || !session.api_key) {
        throw new Error("Unauthorized")
    }

    try {
        const channel = await getChannel({
            channelId,
            accessToken: session.access_token,
            apiKey: session.api_key,
        })

        return { data: channel, allowed: true }
    } catch (error) {
        if (isForbiddenError(error)) {
            return { data: null, allowed: false }
        }
        throw error
    }
}
