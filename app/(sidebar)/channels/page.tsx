import { ProtectedRoute } from "@/components/shared/ProtectedRoute"
import { ChannelsDataTable } from "./ChannelsDataTable"

export default async function Page() {
    return (
        <ProtectedRoute requiredPermission={["auth:view:channel", "auth:admin:channel"]}>
            <ChannelsDataTable />
        </ProtectedRoute>
    )
}
