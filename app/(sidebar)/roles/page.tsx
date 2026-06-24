import { RolesDataTable } from "./RolesDataTable"
import { ProtectedRoute } from "@/components/shared/ProtectedRoute"

export default async function Page() {
    return (
        <ProtectedRoute requiredPermission={["view:role", "admin:role"]}>
            <RolesDataTable />
        </ProtectedRoute>
    )
}
