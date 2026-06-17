'use client';

import { useEffect, useMemo } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { hasPermission, isSuperadmin } from '@/lib/rbac';

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
    const router = useRouter();
    const pathname = usePathname();
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

    useEffect(() => {
        if (status === 'loading') return;

        if (!isAllowed) {
            router.replace(
                `/403?callbackUrl=${encodeURIComponent(pathname || '/')}`
            );
        }
    }, [isAllowed, status, router, pathname]);

    if (status === 'loading') return null;
    if (!isAllowed) return null;

    return <>{children}</>;
}