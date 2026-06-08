"use client"

import { usePermissionFormStore } from "@/components/shared/permission-form-dialog/permission-form-store"
import { PermissionDto } from "@/dtos/PermissionDto"

export default function usePermissionFormDialog() {
    const { setIsOpen, setMode, setPermission, setOnUpdateSuccess } =
        usePermissionFormStore()

    const open = {
        create: () => {
            setPermission(null)
            setMode("create")
            setIsOpen(true)
        },
        edit: (permission: PermissionDto, onUpdateSuccess?: () => void) => {
            setPermission(permission)
            setMode("edit")
            if (onUpdateSuccess) setOnUpdateSuccess(onUpdateSuccess)
            setIsOpen(true)
        },
    }

    const close = () => {
        setIsOpen(false)
        setPermission(null)
    }

    return { open, close }
}
