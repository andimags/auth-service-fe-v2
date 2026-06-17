import { useSession } from "next-auth/react";
import { ReactNode } from "react";
import { hasPermission, isSuperadmin } from "@/lib/rbac";

interface CanProps {
    requiredPermission: string | string[];
    requireAll?: boolean;
    children: ReactNode;
    fallback?: ReactNode;
}

export function Can({
    requiredPermission,
    requireAll = false,
    children,
    fallback = null,
}: Readonly<CanProps>) {
    const { data: session } = useSession();

    const userPermissions = session?.permissions ?? [];

    if (isSuperadmin(session?.user?.level)) {
        return <>{children}</>;
    }

    const allowed = hasPermission(requiredPermission, userPermissions, requireAll);

    return allowed ? <>{children}</> : <>{fallback}</>;
}