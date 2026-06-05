"use client"

import { RoleDto } from "@/dtos/RoleDto"
import { create } from "zustand"

type RoleFormMode = "edit" | "create"

type RoleFormState = {
    isOpen: boolean
    setIsOpen: (value: boolean) => void

    mode: RoleFormMode
    setMode: (value: RoleFormMode) => void

    role: RoleDto | null
    setRole: (role: RoleDto | null) => void

    onUpdateSuccess?: () => void
    setOnUpdateSuccess: (callback: () => void) => void
}

export const useRoleFormStore = create<RoleFormState>((set) => ({
    isOpen: false,

    setIsOpen: (value: boolean) => {
        set({ isOpen: value })
    },

    mode: "create",
    setMode: (value: RoleFormMode) => {
        set({ mode: value })
    },

    role: null,
    setRole: (role: RoleDto | null) => {
        set({ role })
    },

    onUpdateSuccess: undefined,
    setOnUpdateSuccess: (callback: () => void) => {
        set({ onUpdateSuccess: callback })
    },
}))
