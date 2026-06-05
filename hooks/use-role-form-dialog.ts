"use client"

import { useRoleFormStore } from "@/components/shared/role-form-dialog/role-form-store"
import { RoleDto } from "@/dtos/RoleDto"

export default function useRoleFormDialog() {
    const { setIsOpen, setMode, setRole, setOnUpdateSuccess } =
        useRoleFormStore()

    const open = {
        create: () => {
            setRole(null)
            setMode("create")
            setIsOpen(true)
        },
        edit: (role: RoleDto, onUpdateSuccess?: () => void) => {
            setRole(role)
            setMode("edit")
            if (onUpdateSuccess) setOnUpdateSuccess(onUpdateSuccess)
            setIsOpen(true)
        },
    }

    const close = () => {
        setIsOpen(false)
        setRole(null)
    }

    return { open, close }
}
