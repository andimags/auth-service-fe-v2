import { ProtectedRoute } from "@/components/shared/ProtectedRoute"
import { PermissionsDataTable } from "./PermissionsDataTable"

export default async function Page() {
    return (
        <ProtectedRoute requiredPermission={["auth:view:permission", "auth:admin:permission"]}>
            <PermissionsDataTable />
        </ProtectedRoute>
    )
}
