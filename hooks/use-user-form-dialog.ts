"use client"

import { useUserFormStore } from "@/components/shared/user-form-dialog/user-form-store"
import { UserDto } from "@/dtos/UserDto"

export default function useUserFormDialog() {
    const { setIsOpen, setMode, setUser, setOnUpdateSuccess } = useUserFormStore()

    const open = {
        create: () => {
            setUser(null)
            setMode("create")
            setIsOpen(true)
        },
        edit: (user: UserDto, onUpdateSuccess?: () => void) => {
            setUser(user)
            setMode("edit")
            if (onUpdateSuccess) setOnUpdateSuccess(onUpdateSuccess)
            setIsOpen(true)
        },
    }

    const close = () => {
        setIsOpen(false)
        setUser(null)
    }

    return { open, close }
}