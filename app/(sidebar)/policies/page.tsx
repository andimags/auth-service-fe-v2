import { PolicyFormDialog } from "@/components/shared/policy-form-dialog/PolicyFormDialog"
import { ProtectedRoute } from "@/components/shared/ProtectedRoute"
import { PoliciesDataTable } from "./PoliciesDataTable"

export default async function Page() {
    return (
        <ProtectedRoute requiredPermission={["auth:view:policy", "auth:admin:policy"]}>
            <PolicyFormDialog />
            <PoliciesDataTable />
        </ProtectedRoute>
    )
}
