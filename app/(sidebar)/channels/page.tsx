import { ChannelsDataTable } from "./ChannelsDataTable"
import { ProtectedRoute } from "@/components/shared/ProtectedRoute"

export default async function Page() {
    return (
        <ProtectedRoute requiredPermission={["view:channel", "admin:channel"]}>
            <ChannelsDataTable />
        </ProtectedRoute>
    )
}
