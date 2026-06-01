"use client"

import { useConfirmStore } from "./confirm-store"

export function useConfirmDialog() {
    return useConfirmStore((state) => state.confirm)
}