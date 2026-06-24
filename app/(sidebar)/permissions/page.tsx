import { PermissionsDataTable } from "./PermissionsDataTable"
import { ProtectedRoute } from "@/components/shared/ProtectedRoute"

export default async function Page() {
    return (
        <ProtectedRoute requiredPermission={["view:permission", "admin:permission"]}>
            <PermissionsDataTable />
        </ProtectedRoute>
    )
}
