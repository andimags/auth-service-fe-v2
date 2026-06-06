"use client"

import { PolicyDto } from "@/dtos/PolicyDto"
import { create } from "zustand"

type PolicyFormMode = "edit" | "create"

type PolicyFormState = {
    isOpen: boolean
    setIsOpen: (value: boolean) => void

    mode: PolicyFormMode
    setMode: (value: PolicyFormMode) => void

    policy: PolicyDto | null
    setPolicy: (policy: PolicyDto | null) => void

    onUpdateSuccess?: () => void
    setOnUpdateSuccess: (callback: () => void) => void
}

export const usePolicyFormStore = create<PolicyFormState>((set) => ({
    isOpen: false,

    setIsOpen: (value: boolean) => {
        set({ isOpen: value })
    },

    mode: "create",
    setMode: (value: PolicyFormMode) => {
        set({ mode: value })
    },

    policy: null,
    setPolicy: (policy: PolicyDto | null) => {
        set({ policy })
    },

    onUpdateSuccess: undefined,
    setOnUpdateSuccess: (callback: () => void) => {
        set({ onUpdateSuccess: callback })
    },
}))
