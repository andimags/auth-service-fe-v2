import { PermissionFormDialog } from "@/components/shared/permission-form-dialog/PermissionFormDialog"
import { PermissionsDataTable } from "./PermissionsDataTable"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/next-auth"
import { checkPermission } from "@/lib/rbac"
import { redirect } from "next/navigation"

export default async function Page() {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect("/login")
    }

    if (!checkPermission(session, ["view:permission", "admin:permission"])) {
        redirect("/403")
    }

    return (
        <>
            <PermissionFormDialog />
            <PermissionsDataTable />
        </>
    )
}
