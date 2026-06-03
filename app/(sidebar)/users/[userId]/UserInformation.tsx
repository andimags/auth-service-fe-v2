"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { UserDto } from "@/dtos"
import { useDeleteUser } from "@/hooks/use-delete-user"
import useUserFormDialog from "@/hooks/use-user-form-dialog"
import { formatDate } from "@/lib/utils"
import { Delete02Icon, PencilEdit01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useRouter } from "next/navigation"

interface UserInformationProps {
    user: UserDto
}

export default function UserInformation({
    user,
}: Readonly<UserInformationProps>) {
        const userFormDialog = useUserFormDialog()
    const router = useRouter()

    const { deleteUser } = useDeleteUser({
        onSuccess: () => {
            setTimeout(() => router.push("/users"), 1500)
        },
    })

    const handleClickEdit = () => {
        userFormDialog.open.edit(
            user, 
            () => {
                userFormDialog.close()
                setTimeout(() => router.refresh(), 1000)
        })
    }

    return (
        <div className="mx-auto w-full max-w-6xl text-neutral-900 transition-colors duration-200 dark:text-neutral-100">
            {/* Header */}
            <div className="flex items-start justify-between pb-6">
                <div>
                    <h2 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-white">
                        User Information
                    </h2>
                    <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                        Personal details and general information
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleClickEdit}
                    >
                        <HugeiconsIcon
                            icon={PencilEdit01Icon}
                            strokeWidth={2}
                        />
                        <span>Edit</span>
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteUser(user)}
                    >
                        <HugeiconsIcon icon={Delete02Icon} strokeWidth={2} />
                        <span>Delete</span>
                    </Button>
                </div>
            </div>

            {/* Detail rows */}
            <dl className="text-sm">
                <InfoRow label="Full name">
                    {user.last_name}, {user.first_name}
                </InfoRow>
                <InfoRow label="Username">{user.username}</InfoRow>
                <InfoRow label="Email address">{user.email}</InfoRow>
                <InfoRow label="Status">{user.status}</InfoRow>
                <InfoRow label="Level">{user.level}</InfoRow>
                <InfoRow label="Created">{formatDate(user.created_at)}</InfoRow>
                <InfoRow label="Last Updated">
                    {formatDate(user.updated_at)}
                </InfoRow>
                <InfoRow label="Roles">
                    <div className="flex gap-2">
                        {/* TODO: replace with real role data from user.roles */}
                        <Badge variant="outline">Outline</Badge>
                        <Badge variant="outline">Outline</Badge>
                        <Badge variant="outline">Outline</Badge>
                    </div>
                </InfoRow>
            </dl>
        </div>
    )
}

// ---------------------------------------------------------------------------
// Small presentational helper — reduces the 8× repeated grid/border boilerplate
// ---------------------------------------------------------------------------

function InfoRow({
    label,
    children,
}: Readonly<{
    label: string
    children: React.ReactNode
}>) {
    return (
        <div className="grid grid-cols-3 border-t border-neutral-200 py-5 dark:border-neutral-800">
            <dt className="font-semibold text-neutral-900 dark:text-neutral-200">
                {label}
            </dt>
            <dd className="col-span-2 text-neutral-600 dark:text-neutral-400">
                {children}
            </dd>
        </div>
    )
}
