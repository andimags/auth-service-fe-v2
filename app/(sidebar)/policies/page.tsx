import { PolicyFormDialog } from "@/components/shared/policy-form-dialog/PolicyFormDialog"
import { PoliciesDataTable } from "./PoliciesDataTable"
import { ProtectedRoute } from "@/components/shared/ProtectedRoute"

export default async function Page() {
    return (
        <ProtectedRoute requiredPermission={["view:policy", "admin:policy"]}>
            <PolicyFormDialog />
            <PoliciesDataTable />
        </ProtectedRoute>
    )
}
