"use client"

import { PermissionDto } from "@/dtos/PermissionDto"
import { create } from "zustand"

type PermissionFormMode = "edit" | "create"

type PermissionFormState = {
    isOpen: boolean
    setIsOpen: (value: boolean) => void

    mode: PermissionFormMode
    setMode: (value: PermissionFormMode) => void

    permission: PermissionDto | null
    setPermission: (permission: PermissionDto | null) => void

    onUpdateSuccess?: () => void
    setOnUpdateSuccess: (callback: () => void) => void
}

export const usePermissionFormStore = create<PermissionFormState>((set) => ({
    isOpen: false,

    setIsOpen: (value: boolean) => {
        set({ isOpen: value })
    },

    mode: "create",
    setMode: (value: PermissionFormMode) => {
        set({ mode: value })
    },

    permission: null,
    setPermission: (permission: PermissionDto | null) => {
        set({ permission })
    },

    onUpdateSuccess: undefined,
    setOnUpdateSuccess: (callback: () => void) => {
        set({ onUpdateSuccess: callback })
    },
}))
