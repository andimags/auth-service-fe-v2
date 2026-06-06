"use client"

import { usePolicyFormStore } from "@/components/shared/policy-form-dialog/policy-form-store"
import { PolicyDto } from "@/dtos/PolicyDto"

export default function usePolicyFormDialog() {
    const { setIsOpen, setMode, setPolicy, setOnUpdateSuccess } =
        usePolicyFormStore()

    const open = {
        create: () => {
            setPolicy(null)
            setMode("create")
            setIsOpen(true)
        },
        edit: (policy: PolicyDto, onUpdateSuccess?: () => void) => {
            setPolicy(policy)
            setMode("edit")
            if (onUpdateSuccess) setOnUpdateSuccess(onUpdateSuccess)
            setIsOpen(true)
        },
    }

    const close = () => {
        setIsOpen(false)
        setPolicy(null)
    }

    return { open, close }
}
