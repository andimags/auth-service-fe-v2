'use client';

import { useMemo } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { hasPermission, isSuperadmin } from '@/lib/rbac';
import { redirectToLogin } from '../../lib/auth';

type ProtectedRouteProps = {
    requiredPermission: string | string[];
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
        const userPermissions = session?.permissions ?? [];

        // superadmin bypass
        if (isSuperadmin(session?.user?.level)) {
            return true;
        }

        return hasPermission(requiredPermission, userPermissions, requireAll);
    }, [
        session?.permissions,
        session?.user?.level,
        requiredPermission,
        requireAll
    ]);

    if (status === 'loading') return null;
    if (!isAllowed) redirectToLogin();

    return <>{children}</>;
}