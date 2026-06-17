import { UsersDataTable } from "./UsersDataTable"
import { ProtectedRoute } from "@/components/shared/ProtectedRoute"

export default function Page() {
    return <ProtectedRoute requiredPermission={['view:user', 'admin:user']}>
        <UsersDataTable />
    </ProtectedRoute>
}
