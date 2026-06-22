'use client';

import { useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { hasPermission, isSuperadmin } from '@/lib/rbac';
import { redirectToLogin } from '../../lib/auth';

type ProtectedRouteProps = {
    requiredPermission?: string | string[];
    requireAll?: boolean
    children: React.ReactNode;
};

export function ProtectedRoute({
    requiredPermission,
    requireAll,
    children,
}: Readonly<ProtectedRouteProps>) {
    const { data: session, status } = useSession();

    const isAllowed = useMemo(() => {
        if(status == 'unauthenticated') return false
        if(!requiredPermission) return true

        const userPermissions = session?.permissions ?? [];

        if (isSuperadmin(session?.user?.level)) {
            return true;
        }

        return hasPermission(requiredPermission, userPermissions, requireAll);
    }, [
        session?.permissions,
        session?.user?.level,
        requiredPermission,
        requireAll,
        status
    ]);

    if (status === 'loading') return null;
    if (!isAllowed) redirectToLogin();

    return <>{children}</>;
}