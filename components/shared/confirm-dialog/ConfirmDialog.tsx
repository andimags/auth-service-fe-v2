"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogMedia,
} from "@/components/ui/alert-dialog"

import { Trash2Icon } from "lucide-react"
import { useConfirmStore } from "./confirm-store"
import React from "react"

export function ConfirmDialog() {
    const { open, options, close } = useConfirmStore()
    const [isLoading, setIsLoading] = React.useState(false)

    const handleConfirm = async () => {
        if (!options) return
        setIsLoading(true)
        await options.onConfirm()
        close()
        setIsLoading(false)
    }

    return (
        <AlertDialog open={open} onOpenChange={close}>
            <AlertDialogContent size="sm">
                <AlertDialogHeader>
                    <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                        <Trash2Icon />
                    </AlertDialogMedia>
                    <AlertDialogTitle>{options?.title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {options?.description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel variant="outline">
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        variant="destructive"
                        onClick={handleConfirm}
                        disabled={isLoading}
                    >
                        {isLoading ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
