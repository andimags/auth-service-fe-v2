import { ProtectedRoute } from "@/components/shared/ProtectedRoute"
import { RolesDataTable } from "./RolesDataTable"

export default async function Page() {
    return (
        <ProtectedRoute requiredPermission={["auth:view:role", "auth:admin:role"]}>
            <RolesDataTable />
        </ProtectedRoute>
    )
}
