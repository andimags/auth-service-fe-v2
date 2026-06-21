import { PolicyFormDialog } from "@/components/shared/policy-form-dialog/PolicyFormDialog"
import { PoliciesDataTable } from "./PoliciesDataTable"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/next-auth"
import { checkPermission } from "@/lib/rbac"
import { redirect } from "next/navigation"

export default async function Page() {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect("/login")
    }

    if (!checkPermission(session, ["view:policy", "admin:policy"])) {
        redirect("/403")
    }

    return (
        <>
            <PolicyFormDialog />
            <PoliciesDataTable />
        </>
    )
}
