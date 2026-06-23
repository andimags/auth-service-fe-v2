import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/next-auth';
import { hasPermission, isSuperadmin } from '@/lib/rbac';

type ProtectedRouteProps = {
    requiredPermission?: string | string[];
    requireAll?: boolean;
    children: React.ReactNode;
};

export async function ProtectedRoute({
    requiredPermission,
    requireAll,
    children,
}: Readonly<ProtectedRouteProps>) {
    const session = await getServerSession(authOptions);

    if (!session) redirect('/login');

    if (requiredPermission && !isSuperadmin(session.user?.level)) {
        const userPermissions = session.permissions ?? [];
        const isAllowed = hasPermission(requiredPermission, userPermissions, requireAll);
        if (!isAllowed) redirect('/403');
    }

    return <>{children}</>;
}