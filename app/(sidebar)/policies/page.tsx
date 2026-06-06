import { PolicyFormDialog } from "@/components/shared/policy-form-dialog/PolicyFormDialog"
import { PoliciesDataTable } from "./PoliciesDataTable"

export default function Page() {
    return(
        <>
            <PolicyFormDialog />
            <PoliciesDataTable />
        </>
    )
}
