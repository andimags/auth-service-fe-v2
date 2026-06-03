import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { UserDto } from "@/dtos/UserDto"
import { useEffect, useState } from "react"

import { UserLevelType, UserStatusType } from "@/constants/enums"
import { toast } from "sonner"
import UserFormState from "./user-form-state"
import { useQueryClient } from "@tanstack/react-query"

interface UserFormDialogProps {
    open: boolean
    setOpen: (open: boolean) => void
    mode: "create" | "edit"
    user?: UserDto
    onUpdateSuccess?: () => void
}

const initialFormState: UserFormState = {
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    status: "",
    level: "",
}

export function UserFormDialog({
    open,
    setOpen,
    mode,
    user,
    onUpdateSuccess,
}: Readonly<UserFormDialogProps>) {
    const [payload, setPayload] = useState<UserFormState>(initialFormState)
    const queryClient = useQueryClient()

    useEffect(() => {
        const loadUserData = () => {
            if (open) {
                if (mode === "edit" && user) {
                    setPayload({
                        password: "",
                        username: user.username ?? "",
                        email: user.email ?? "",
                        first_name: user.first_name ?? "",
                        last_name: user.last_name ?? "",
                        status: user.status,
                        level: user.level,
                    })
                } else {
                    setPayload(initialFormState)
                }
            }
        }

        loadUserData()
    }, [open, mode, user])

    const BASE_URL =
        process.env.NEXT_PUBLIC_BASE_URL ??
        process.env.NEXTAUTH_URL ??
        "http://localhost:3000"

    const [isLoading, setIsLoading] = useState(false)

    const onAddUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const response = await fetch(`${BASE_URL}/api/users`, {
                method: "POST",
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": "application/json",
                },
            })

            if (response.ok) {
                setOpen(false)
                toast.success("User has been created")
                queryClient.invalidateQueries({ queryKey: ["users"] })
            } else {
                const error = await response.text()
                toast.warning(error || "Failed to create user")
            }
        } catch (error) {
            console.error(error)
            toast.error("Network error. Please try again.")
        } finally {
            setPayload(initialFormState)
            setIsLoading(false)
        }
    }

    const onUpdateUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        const { password: _password, ...updatePayload } = payload

        try {
            const response = await fetch(`${BASE_URL}/api/users/${user?.id}`, {
                method: "PUT",
                body: JSON.stringify(updatePayload),
                headers: {
                    "Content-Type": "application/json",
                },
            })

            if (response.ok) {
                setOpen(false)
                toast.success("User has been updated")
                queryClient.invalidateQueries({ queryKey: ["users"] })
                onUpdateSuccess?.()
            } else {
                const error = await response.text()
                toast.warning(error || "Failed to update user")
            }
        } catch (error) {
            console.error(error)
            toast.error("Network error. Please try again.")
        } finally {
            setPayload(initialFormState)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        console.log(payload)
    }, [payload])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-h-[90vh] overflow-y-scroll sm:max-w-sm">
                <form onSubmit={mode == "create" ? onAddUser : onUpdateUser}>
                    <DialogHeader className="mb-4">
                        <DialogTitle>
                            {mode === "create" ? "Create User" : "Edit User"}
                        </DialogTitle>
                        <DialogDescription>
                            {mode === "create"
                                ? "Fill in the details to create a new user."
                                : "Make changes to the user's information here. Click save when you're done."}
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup>
                        <Field>
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                name="username"
                                placeholder="Andi"
                                value={payload.username}
                                onChange={(e) =>
                                    setPayload((prev) => ({
                                        ...prev,
                                        username: e.target.value,
                                    }))
                                }
                            />
                        </Field>
                        <Field>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                placeholder="andi@example.com"
                                value={payload.email}
                                onChange={(e) =>
                                    setPayload((prev) => ({
                                        ...prev,
                                        email: e.target.value,
                                    }))
                                }
                            />
                        </Field>
                        <Field>
                            <Label htmlFor="first_name">First Name</Label>
                            <Input
                                id="first_name"
                                name="first_name"
                                placeholder="Andi"
                                value={payload.first_name}
                                onChange={(e) =>
                                    setPayload((prev) => ({
                                        ...prev,
                                        first_name: e.target.value,
                                    }))
                                }
                            />
                        </Field>
                        <Field>
                            <Label htmlFor="last_name">Last Name</Label>
                            <Input
                                id="last_name"
                                name="last_name"
                                placeholder="Mags"
                                value={payload.last_name}
                                onChange={(e) =>
                                    setPayload((prev) => ({
                                        ...prev,
                                        last_name: e.target.value,
                                    }))
                                }
                            />
                        </Field>
                        {mode === "create" && (
                            <Field>
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Enter password"
                                    value={payload.password}
                                    onChange={(e) =>
                                        setPayload((prev) => ({
                                            ...prev,
                                            password: e.target.value,
                                        }))
                                    }
                                />
                            </Field>
                        )}
                        <Field>
                            <Label htmlFor="status">Level</Label>
                            <Select
                                value={payload.level}
                                onValueChange={(value) =>
                                    setPayload((prev) => ({
                                        ...prev,
                                        level: value as UserLevelType,
                                    }))
                                }
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select level" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {Object.values(UserLevelType).map(
                                            (level) => (
                                                <SelectItem
                                                    key={level}
                                                    value={level}
                                                >
                                                    {level}
                                                </SelectItem>
                                            )
                                        )}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </Field>
                        <Field>
                            <Label htmlFor="status">Status</Label>
                            <Select
                                value={payload.status}
                                onValueChange={(value) =>
                                    setPayload((prev) => ({
                                        ...prev,
                                        status: value as UserStatusType,
                                    }))
                                }
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {Object.values(UserStatusType).map(
                                            (status) => (
                                                <SelectItem
                                                    key={status}
                                                    value={status}
                                                >
                                                    {status}
                                                </SelectItem>
                                            )
                                        )}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </Field>
                    </FieldGroup>
                    <DialogFooter className="mt-6">
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading
                                ? mode === "create"
                                    ? "Creating user..."
                                    : "Updating user..."
                                : "Save changes"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
export type UserDialogType = {
    open: boolean
    mode: "create" | "edit"
    user: UserDto | undefined
}
