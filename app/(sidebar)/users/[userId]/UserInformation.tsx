"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { UserDto } from "@/dtos"
import { formatDate } from "@/lib/utils"
import { HugeiconsIcon } from "@hugeicons/react"
import { PencilEdit01Icon, Delete02Icon } from "@hugeicons/core-free-icons"
import { UserFormDialog } from "../UserFormDialog"
import { useState } from "react"
import { useRouter } from "next/navigation"
import React from "react"
import { useConfirmDialog } from "@/components/shared/confirm-dialog/use-confirm"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const dynamic = "force-dynamic"

export default function Page({
    user,
}: Readonly<{
    user: UserDto
}>) {
    const [isOpenUserDialog, setIsOpenUserDialog] = useState(false)
    const router = useRouter()

    const onUpdateSuccess = () => {
        setTimeout(() => {
            router.refresh()
        }, 50)
    }

    const confirm = useConfirmDialog()
    const BASE_URL =
        process.env.NEXT_PUBLIC_BASE_URL ??
        process.env.NEXTAUTH_URL ??
        "http://localhost:3000"

    const onDeleteUser = React.useCallback(async (user: UserDto) => {
        await confirm({
            title: "Delete User?",
            description: "This action cannot be undone",
            onConfirm: async () => {
                try {
                    const response = await fetch(
                        `${BASE_URL}/api/users/${user.id}`,
                        {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    )

                    if (response.ok) {
                        toast.success("User has been deleted")
                        setTimeout(() => {
                            router.push("/users")
                        }, 2000)
                    } else {
                        const error = await response.text()
                        toast.warning(error || "Failed to delete user")
                    }
                } catch (error) {
                    console.error(error)
                    toast.error("Network error. Please try again.")
                }
            },
        })
    }, [])

    return (
        <>
            <UserFormDialog
                open={isOpenUserDialog}
                setOpen={(open) => setIsOpenUserDialog(open)}
                mode={"edit"}
                user={user}
                onUpdateSuccess={onUpdateSuccess}
            />
            <div className="mx-auto w-full max-w-6xl text-neutral-900 transition-colors duration-200 dark:text-neutral-100">
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
                            onClick={() => setIsOpenUserDialog(true)}
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
                            onClick={() => onDeleteUser(user)}
                        >
                            <HugeiconsIcon
                                icon={Delete02Icon}
                                strokeWidth={2}
                            />
                            <span>Delete</span>
                        </Button>
                    </div>
                </div>

                <div className="text-sm">
                    <div className="grid grid-cols-3 border-t border-neutral-200 py-5 dark:border-neutral-800">
                        <div className="font-semibold text-neutral-900 dark:text-neutral-200">
                            Full name
                        </div>
                        <div className="col-span-2 text-neutral-600 dark:text-neutral-400">
                            {user.last_name}, {user.first_name}
                        </div>
                    </div>

                    <div className="grid grid-cols-3 border-t border-neutral-200 py-5 dark:border-neutral-800">
                        <div className="font-semibold text-neutral-900 dark:text-neutral-200">
                            Username
                        </div>
                        <div className="col-span-2 text-neutral-600 dark:text-neutral-400">
                            {user.username}
                        </div>
                    </div>

                    <div className="grid grid-cols-3 border-t border-neutral-200 py-5 dark:border-neutral-800">
                        <div className="font-semibold text-neutral-900 dark:text-neutral-200">
                            Email address
                        </div>
                        <div className="col-span-2 text-neutral-600 dark:text-neutral-400">
                            {user.email}
                        </div>
                    </div>

                    <div className="grid grid-cols-3 border-t border-neutral-200 py-5 dark:border-neutral-800">
                        <div className="font-semibold text-neutral-900 dark:text-neutral-200">
                            Status
                        </div>
                        <div className="col-span-2 text-neutral-600 dark:text-neutral-400">
                            {user.status}
                        </div>
                    </div>

                    <div className="grid grid-cols-3 border-t border-neutral-200 py-5 dark:border-neutral-800">
                        <div className="font-semibold text-neutral-900 dark:text-neutral-200">
                            Level
                        </div>
                        <div className="col-span-2 text-neutral-600 dark:text-neutral-400">
                            {user.level}
                        </div>
                    </div>

                    <div className="grid grid-cols-3 border-t border-neutral-200 py-5 dark:border-neutral-800">
                        <div className="font-semibold text-neutral-900 dark:text-neutral-200">
                            Created
                        </div>
                        <div className="col-span-2 text-neutral-600 dark:text-neutral-400">
                            {formatDate(user.created_at)}
                        </div>
                    </div>

                    <div className="grid grid-cols-3 border-t border-neutral-200 py-5 dark:border-neutral-800">
                        <div className="font-semibold text-neutral-900 dark:text-neutral-200">
                            Last Updated
                        </div>
                        <div className="col-span-2 text-neutral-600 dark:text-neutral-400">
                            {formatDate(user.updated_at)}
                        </div>
                    </div>

                    <div className="grid grid-cols-3 border-t border-neutral-200 py-5 dark:border-neutral-800">
                        <div className="font-semibold text-neutral-900 dark:text-neutral-200">
                            Roles
                        </div>
                        <div className="col-span-2 flex gap-2 text-neutral-600 dark:text-neutral-400">
                            <Badge variant="outline">Outline</Badge>
                            <Badge variant="outline">Outline</Badge>
                            <Badge variant="outline">Outline</Badge>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
