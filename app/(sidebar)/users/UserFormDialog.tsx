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
import { UserDto } from "@/dtos/UserDto"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react"

import UserFormState from "./user-form-state"
import { UserStatusType, UserLevelType } from "@/constants/enums"

interface UserFormDialogProps {
    open: boolean
    setOpen: (open: boolean) => void
    mode: "create" | "edit"
    user?: UserDto
}

const initialFormState: UserFormState = {
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    status: undefined,
    level: undefined,
}

export function UserFormDialog({
    open,
    setOpen,
    mode,
    user,
}: Readonly<UserFormDialogProps>) {
    const [payload, setPayload] = useState<UserFormState>(initialFormState)

    useEffect(() => {
        const loadUserData = () => {
            if (open) {
                if (mode === "edit" && user) {
                    setPayload({
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

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <form>
                <DialogContent className="max-h-[90vh] overflow-y-scroll sm:max-w-sm">
                    <DialogHeader>
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
                                    setPayload({
                                        ...payload,
                                        username: e.target.value,
                                    })
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
                                    setPayload({
                                        ...payload,
                                        email: e.target.value,
                                    })
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
                                    setPayload({
                                        ...payload,
                                        first_name: e.target.value,
                                    })
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
                                    setPayload({
                                        ...payload,
                                        last_name: e.target.value,
                                    })
                                }
                            />
                        </Field>
                        <Field>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter password"
                                value={payload.password}
                                onChange={(e) =>
                                    setPayload({
                                        ...payload,
                                        password: e.target.value,
                                    })
                                }
                            />
                        </Field>
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
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
