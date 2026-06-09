"use client"

import { create } from "zustand"
import React from "react"

export type ConfirmOptions = {
    title: string
    description?: string
    icon?: React.ReactNode
    onConfirm: () => void | Promise<void>
}

type ConfirmState = {
    open: boolean
    options: ConfirmOptions | null
    resolver: (() => void) | null
    confirm: (options: ConfirmOptions) => Promise<void>
    close: () => void
}

export const useConfirmStore = create<ConfirmState>((set, get) => ({
    open: false,
    options: null,
    resolver: null,

    confirm: (options) => {
        set({
            open: true,
            options,
        })

        // Resolve param is a function that you can call when the promise is finished executing
        return new Promise<void>((resolve) => {
            set({ resolver: resolve })
        })
    },

    close: () => {
        const { resolver } = get()

        set({
            open: false,
            options: null,
            resolver: null,
        })

        resolver?.()
    },
}))
