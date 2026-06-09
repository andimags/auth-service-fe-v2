import { PermissionFormDialog } from "@/components/shared/permission-form-dialog/PermissionFormDialog"
import { PermissionsDataTable } from "./PermissionsDataTable"

export default function Page() {
    return (
        <>
            <PermissionFormDialog />
            <PermissionsDataTable />
        </>
    )
}
