import { ChannelFormDialog } from "@/components/shared/channel-form-dialog/ChannelFormDialog"
import { ChannelsDataTable } from "./ChannelsDataTable"

export default function Page() {
    return (
        <>
            <ChannelsDataTable />
            <ChannelFormDialog />
        </>
    )
}
