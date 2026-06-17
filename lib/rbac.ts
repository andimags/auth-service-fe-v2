type PermissionInput = string | string[];

export function hasPermission(
    requiredPermissions: PermissionInput,
    userPermissions: string[] = [],
    requireAll: boolean = false,
): boolean {
    const _requiredPermissions = Array.isArray(requiredPermissions)
        ? requiredPermissions
        : [requiredPermissions];

    if(requireAll){
        return _requiredPermissions.every((p) =>
            userPermissions.includes(p)
        );
    }
    else{
        return _requiredPermissions.some((p) =>
            userPermissions.includes(p)
        );
    }
}

export function isSuperadmin(level?: string): boolean {
    return (
        level === 'root_superadmin' ||
        level === 'superadmin'
    );
}