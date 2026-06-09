import { ChannelDto } from "@/dtos/ChannelDto"
import { authOptions } from "@/lib/next-auth"
import { getChannel } from "@/services/channel.service"
import { getServerSession } from "next-auth/next"
import ChannelInformation from "./ChannelInformation"

export const dynamic = "force-dynamic"

export default async function Page({
    params,
}: Readonly<{
    params: Promise<{ channelId: string }>
}>) {
    const { channelId } = await params
    const channel = await getChannelData(channelId)

    return <ChannelInformation channel={channel} />
}

async function getChannelData(channelId: string): Promise<ChannelDto> {
    const session = await getServerSession(authOptions)

    if (!session?.access_token || !session.api_key) {
        throw new Error("Unauthorized")
    }

    return await getChannel({
        channelId,
        accessToken: session.access_token,
        apiKey: session.api_key,
    })
}
