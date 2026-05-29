"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CheckCircle2Icon, MoreHorizontalIcon, XCircleIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DataTable,
    DataTableColumnHeader,
    FacetedFilterConfig,
} from "@/components/ui/data-table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { HugeiconsIcon } from "@hugeicons/react"
import { PlusSignIcon } from "@hugeicons/core-free-icons"
import React from "react"
import { UserFormDialog } from "./UserFormDialog"
import { UserDto } from "@/dtos"
import { UserLevelType, UserStatusType } from "@/constants/enums"
import Link from "next/link"

const users: UserDto[] = [
    {
        id: 1,
        username: "johndoe",
        email: "joghndoe@example.com",
        first_name: "John",
        last_name: "Doe",
        status: UserStatusType.active,
        level: UserLevelType.admin,
        created_at: new Date(),
        updated_at: new Date(),
    },
]

const statusIcons = {
    active: CheckCircle2Icon,
    inactive: XCircleIcon,
}

function getColumns(onEdit: (user: UserDto) => void): ColumnDef<UserDto>[] {
    return [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) =>
                        table.toggleAllPageRowsSelected(!!value)
                    }
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "id",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="User ID" />
            ),
            cell: ({ row }) => (
                <div className="w-20 font-medium">{row.getValue("id")}</div>
            ),
            enableHiding: false,
        },
        {
            accessorKey: "username",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Username" />
            ),
            cell: ({ row }) => (
                <div className="flex space-x-2">
                    <span className="max-w-125 truncate font-medium">
                        {row.getValue("username")}
                    </span>
                </div>
            ),
        },
        {
            accessorKey: "full_name",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Full Name" />
            ),
            cell: ({ row }) => {
                const user = row.original

                return (
                    <div className="flex space-x-2">
                        <span className="max-w-125 truncate font-medium">
                            {user.last_name}, {user.first_name}
                        </span>
                    </div>
                )
            },
        },
        {
            accessorKey: "status",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Status" />
            ),
            cell: ({ row }) => {
                const status = row.getValue("status") as UserDto["status"]
                const Icon = statusIcons[status]
                return (
                    <div className="flex w-25 items-center">
                        <Icon className="mr-2 size-4 text-muted-foreground" />
                        <span className="capitalize">
                            {status.replace("-", " ")}
                        </span>
                    </div>
                )
            },
            filterFn: (row, id, value) => {
                return value.includes(row.getValue(id))
            },
        },
        {
            accessorKey: "level",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="level" />
            ),
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("level")}</div>
            ),
            filterFn: (row, id, value) => {
                return value.includes(row.getValue(id))
            },
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const user = row.original
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="size-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontalIcon className="size-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() =>
                                    navigator.clipboard.writeText(
                                        user.id.toString()
                                    )
                                }
                            >
                                Copy user ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <Link href={`/users/${row.id}`}>
                                <DropdownMenuItem>
                                    View
                                </DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem onClick={() => onEdit(user)}>
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]
}

const facetedFilters: FacetedFilterConfig[] = [
    {
        column: "status",
        title: "Status",
        options: Object.values(UserStatusType).map((value) => ({
            label: value,
            value,
        })),
    },
    {
        column: "level",
        title: "Level",
        options: Object.values(UserLevelType).map((value) => ({
            label: value,
            value,
        })),
    },
]

function ToolbarChildren({ onAdd }: Readonly<{ onAdd: () => void }>) {
    return (
        <Button variant="outline" size="sm" className="gap-2" onClick={onAdd}>
            <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2} />
            <span>Add User</span>
        </Button>
    )
}

type UserDialogType = {
    open: boolean
    mode: "create" | "edit"
    user: UserDto | undefined
}

export function UsersDataTable() {
    const [userDialog, setUserDialog] = React.useState<UserDialogType>({
        open: false,
        mode: "create",
        user: undefined,
    })

    const handleEdit = React.useCallback((user: UserDto) => {
        setUserDialog({
            open: true,
            mode: "edit",
            user,
        })
    }, [])

    return (
        <>
            <UserFormDialog
                open={userDialog.open}
                setOpen={(open) => setUserDialog({ ...userDialog, open })}
                mode={userDialog.mode}
                user={userDialog.user}
            />
            <DataTable
                columns={getColumns(handleEdit)}
                data={users}
                filterColumn="username"
                filterPlaceholder="Filter users..."
                facetedFilters={facetedFilters}
                showColumnToggle
                showPagination
                showPageNumbers
                enableRowSelection
                defaultPageSize={10}
                getRowId={(row) => row.id.toString()}
                onRowClick={(row) => console.log("Clicked:", row.id)}
                toolbarChildren={
                    <ToolbarChildren
                        onAdd={() =>
                            setUserDialog({
                                ...userDialog,
                                open: true,
                                mode: "create",
                            })
                        }
                    />
                }
            />
        </>
    )
}
