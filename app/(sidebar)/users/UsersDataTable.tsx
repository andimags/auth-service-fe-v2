"use client"

import {
    ColumnDef,
    type ColumnFiltersState,
    type SortingState,
} from "@tanstack/react-table"
import { CheckCircle2Icon, MoreHorizontalIcon, XCircleIcon } from "lucide-react"

import { useConfirmDialog } from "@/components/shared/confirm-dialog/use-confirm"
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
import { UserLevelType, UserStatusType } from "@/constants/enums"
import { UserDto } from "@/dtos"
import { useUsersQuery } from "@/hooks/use-users-query"
import { formatDate } from "@/lib/utils"
import { PlusSignIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useQueryClient } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import Link from "next/link"
import React from "react"
import { toast } from "sonner"
import { UserDialogType, UserFormDialog } from "./UserFormDialog"

const statusIcons = {
    active: CheckCircle2Icon,
    inactive: XCircleIcon,
}

function getColumns(
    onEdit: (user: UserDto) => void,
    onDelete: (user: UserDto) => void
): ColumnDef<UserDto>[] {
    return [
        {
            id: "globalSearch",
            header: () => null,
            cell: () => null,
            filterFn: () => true,
            enableSorting: false,
            enableHiding: false,
        },
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
                <DataTableColumnHeader column={column} title="Level" />
            ),
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("level")}</div>
            ),
            filterFn: (row, id, value) => {
                return value.includes(row.getValue(id))
            },
        },
        {
            accessorKey: "created_at",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Created At" />
            ),
            cell: ({ row }) => (
                <div className="capitalize">
                    {formatDate(row.getValue("created_at") as string)}
                </div>
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
                                <DropdownMenuItem>View</DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem onClick={() => onEdit(user)}>
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onDelete(user)}>
                                Delete
                            </DropdownMenuItem>
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

    const confirm = useConfirmDialog()
    const BASE_URL =
        process.env.NEXT_PUBLIC_BASE_URL ??
        process.env.NEXTAUTH_URL ??
        "http://localhost:3000"
    const queryClient = useQueryClient()

    const handleDelete = React.useCallback(
        async (user: UserDto) => {
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
                            queryClient.invalidateQueries({
                                queryKey: ["users"],
                            })
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
        },
        []
    )

    const { status } = useSession()

    const [pagination, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 10,
    })

    const [sorting, setSorting] = React.useState<SortingState>([
        { id: "created_at", desc: true },
    ])
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([])

    const search = React.useMemo(() => {
        const filter = columnFilters.find((f) => f.id === "globalSearch")
        return filter && filter.value ? String(filter.value) : undefined
    }, [columnFilters])

    const statusFilter = React.useMemo(() => {
        const filter = columnFilters.find((f) => f.id === "status")
        return filter && Array.isArray(filter.value)
            ? filter.value.join(",")
            : undefined
    }, [columnFilters])

    const sortField = React.useMemo(
        () => (sorting.length > 0 ? String(sorting[0].id) : undefined),
        [sorting]
    )

    const sortDesc = React.useMemo(
        () => Boolean(sorting.length > 0 && sorting[0].desc),
        [sorting]
    )

    const query = useUsersQuery(
        {
            page: pagination.pageIndex + 1,
            size: pagination.pageSize,
            search,
            status: statusFilter,
            sortField,
            sortDesc,
        },
        {
            enabled: status === "authenticated",
        }
    )

    const data = query.data?.rows ?? []
    const isLoading = query.isLoading
    const pageCount = query.data?.totalPages ?? 0

    return (
        <>
            <UserFormDialog
                open={userDialog.open}
                setOpen={(open) => setUserDialog({ ...userDialog, open })}
                mode={userDialog.mode}
                user={userDialog.user}
            />
            <DataTable
                columns={getColumns(handleEdit, handleDelete)}
                data={data}
                isLoading={isLoading}
                filterColumn="globalSearch"
                filterPlaceholder="Search users..."
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
                // Controlled state for server-side
                pagination={pagination}
                onPaginationChange={(p) => setPagination(p)}
                sorting={sorting}
                onSortingChange={setSorting}
                columnFilters={columnFilters}
                onColumnFiltersChange={setColumnFilters}
                manualPagination
                pageCount={pageCount}
            />
        </>
    )
}
