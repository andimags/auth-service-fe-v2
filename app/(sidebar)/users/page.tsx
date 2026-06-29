import { ProtectedRoute } from "@/components/shared/ProtectedRoute"
import { UsersDataTable } from "./UsersDataTable"

export default function Page() {
    return <ProtectedRoute requiredPermission={['auth:view:user', 'auth:admin:user']}>
        <UsersDataTable />
    </ProtectedRoute>
}
