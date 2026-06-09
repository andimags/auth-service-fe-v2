"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PermissionDto, PolicyPermissionDto, PolicyDto } from "@/dtos"
import usePolicyFormDialog from "@/hooks/use-policy-form-dialog"
import formatDate from "@/lib/format-date"
import {
    Delete02Icon,
    PencilEdit01Icon,
    ShieldUserIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ManagePermissionsDialog } from "./ManagePermissionsDialog"
import { useDeletePolicy } from "@/hooks/use-delete-policy"

interface PolicyInformationProps {
    policy: PolicyDto
    policyPermissions: PolicyPermissionDto[]
    permissions: PermissionDto[]
}

export default function PolicyInformation({
    policy,
    policyPermissions,
    permissions,
}: Readonly<PolicyInformationProps>) {
    const [isOpen, setIsOpen] = useState(false)
    const policyFormDialog = usePolicyFormDialog()
    const router = useRouter()

    const { deletePolicy } = useDeletePolicy({
        onSuccess: () => {
            setTimeout(() => router.push("/policies"), 1500)
        },
    })

    const handleEditPolicy = () => {
        policyFormDialog.open.edit(policy, () => {
            policyFormDialog.close()
            setTimeout(() => router.refresh(), 1000)
        })
    }

    const handleManagePermissions = () => {
        setIsOpen(true)
    }

    const selectedValues = policyPermissions.map((permission) =>
        permission.id.toString()
    )

    const permissionOptions = permissions.map((permission) => ({
        label: `${permission.ref_name} | ${permission.name}`,
        value: permission.id.toString(),
    }))

    return (
        <>
            <ManagePermissionsDialog
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                options={permissionOptions}
                selectedValues={selectedValues}
                policy={policy}
            />
            <div className="mx-auto w-full max-w-6xl text-neutral-900 transition-colors duration-200 dark:text-neutral-100">
                <div className="flex items-start justify-between pb-6">
                    <div>
                        <h2 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-white">
                            Policy Information
                        </h2>
                        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                            Policy details and attached permissions.
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleEditPolicy}
                        >
                            <HugeiconsIcon
                                icon={PencilEdit01Icon}
                                strokeWidth={2}
                            />
                            <span>Edit Policy</span>
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleManagePermissions}
                        >
                            <HugeiconsIcon
                                icon={ShieldUserIcon}
                                strokeWidth={2}
                            />
                            <span>Manage Permissions</span>
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deletePolicy(policy)}
                        >
                            <HugeiconsIcon
                                icon={Delete02Icon}
                                strokeWidth={2}
                            />
                            <span>Delete</span>
                        </Button>
                    </div>
                </div>

                <dl className="text-sm">
                    <InfoRow label="Name">{policy.name}</InfoRow>
                    <InfoRow label="Reference Name">{policy.ref_name}</InfoRow>
                    <InfoRow label="Description">
                        {policy.description ?? "-"}
                    </InfoRow>
                    <InfoRow label="Created">
                        {formatDate(policy.created_at)}
                    </InfoRow>
                    <InfoRow label="Last Updated">
                        {formatDate(policy.updated_at)}
                    </InfoRow>
                    <InfoRow label="Permissions">
                        <div className="flex flex-wrap gap-2">
                            {policyPermissions.length < 1 ? (
                                <span>
                                    No permissions attached to this role
                                </span>
                            ) : (
                                policyPermissions.map((permission) => (
                                    <Badge
                                        key={permission.id}
                                        variant="outline"
                                    >
                                        {permission.ref_name}
                                    </Badge>
                                ))
                            )}
                        </div>
                    </InfoRow>
                </dl>
            </div>
        </>
    )
}

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
