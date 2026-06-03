"use client"

import { useConfirmStore } from "@/components/shared/confirm-dialog/confirm-store"

export default function useConfirmDialog() {
    return useConfirmStore((state) => state.confirm)
}